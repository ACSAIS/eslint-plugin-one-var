import * as espree from "espree";

export function fixer(code) {
    const ast = espree.parse(code, {

    });
    console.log(ast);
}
