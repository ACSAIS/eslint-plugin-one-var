import * as espree from "espree";
import traverse from "babel-traverse";
import * as fs from "fs";
import generate from "babel-generator";
import * as t from "babel-types";

export function fixer(code) {
    const ast = espree.parse(code, {
        ecmaVersion: 6,
    });
    traverse(ast, {
        enter: function(path) {
            if (path.node.type === "VariableDeclaration") {
                if (path.node.declarations.length > 1) {
                    const {declarations, kind} = path.node;
                    const firstDeclaration = declarations.shift();
                    const newNodes = [];

                    path.node.declarations = [firstDeclaration];
                    declarations.forEach( declaration => {
                        let newNode = t.variableDeclaration(kind, [declaration]);

                        newNodes.push(newNode)
                    });
                    path.parent.body.splice(path.parent.body.indexOf(path.node), 0, ...newNodes);
                }
            }
        },
    });
    const generated = generate(ast, {}, code);
    fs.writeFileSync('src/result.js', generated.code);

}
