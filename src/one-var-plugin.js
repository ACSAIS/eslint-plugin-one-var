import espree from "espree";



export function fixer(code) {
    console.log(code);
    const ast = espree.parse(code, {
        ecmaVersion: 6,
    });
    console.log(ast);
}
