### 说明
1. yarn init 
2. yarn add (--dev 测试环境依赖,一般装 mocha 之类的测试库.ts-node 之间跑 es6 文件)
3. 根目录下执行 tsc 即可编译所有 .ts文件
4. ts-node start.ts 可以不编译跑.ts 文件
5. 编译生成lib 和 types 文件夹,注意 tsconfig 和 package 文件,链接https://shuoit.net/tech-notes/Allow--declaration-with--allowJs-1546511333.html
