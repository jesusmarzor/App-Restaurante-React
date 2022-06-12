module.exports = {
    presets: ["@babel/react", "@babel/env"],
    presets: ["next/babel"],
    plugins: [
        function () {
          return {
            visitor: {
              MetaProperty(path) {
                path.replaceWithSourceString('process')
              },
            },
          }
        },
      ],
}