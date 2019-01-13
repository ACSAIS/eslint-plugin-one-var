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
                    const {declarations} = path.node;
                    const firstDeclaration = declarations.shift();
                    path.node.declarations = [firstDeclaration];
                    const newNodes = [];
                    declarations.forEach( declaration => {
                        let newNode = {};
                        require("ast-types").eachField(path.node, function(name, value) {
                            // Note that undefined fields will be visited too, according to
                            // the rules associated with node.type, and default field values
                            // will be substituted if appropriate.
                            newNode[name] = value;
                        });

                        newNode.declarations = [declaration];
                        newNodes.push(newNode);
                        console.log(path.node);
                        path.body.insertAfter(t.identifier("b"));
                    });
                    // console.log(newNodes);
                    // path.insertAfter(newNodes);
                }
            }
        },
    });
    const generated = generate(ast, {}, code);
    fs.writeFileSync('src/result.js', generated.code);

}
