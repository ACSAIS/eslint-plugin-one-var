import espree from "espree";



export function fixer(code) {
    const ast = espree.parse(code, {

    });8
    console.log(ast);
}
