import * as espree from "espree";
import traverse from "babel-traverse";
import * as fs from "fs";

export function fixer(code) {
    const ast = espree.parse(code, {
        ecmaVersion: 6,
    });

    fs.writeFileSync('src/result.json', JSON.stringify(ast,null, 4), 'utf8');
    traverse(ast, {
        enter: function(path) {
            if (path.node.type === "VariableDeclaration") {
                //path.replaceWith(replacement)
                if (path.node.declarations.length > 1) {
                    const {declarations} = path.node;
                    // console.log(JSON.stringify(path.node.kind,null, 4),);
                }
            }
        },
    });
}
