const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 기존에 있던 파일 ? 변경된 파일등을 자동으로 정리해주느? 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode: 'development',//개발용
    entry: {
        main: './src/app.js'
    },
    output: {
        path: path.resolve('./dist'), // dist 하위에 결과물 저장
        filename: '[name].js' // entry에 설정한 key값이 나온다. dist 폴더에 main.js가 결과물!!
    },
    //////여기까지는 js 모듈들 번들링되도록 설정해준 진짜 기본
    
    // 스타일쪽 로더들 번들링되도록 추가로 설정
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpeg|png)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        // index.htm 이 웹페이지를 생성해주기 때문에 이미지 경로 따로 설정 안해줘도 된다.
                        // publicPath: '../dist' // 이미지호출할때 상대경로/dist/파일명

                        // 원본파일의 이름[name], 확장자[ext]
                        name: '[name].[ext]?[hash]' //이렇게 넣어주면 파일을 호출할때 원본파일이름으로 최신 파일로 넣어준다.
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),// 자동으로 아웃풋으로 설정된 디스트 폴더를 삭제하고 웹팩을 돌려주기 때문에 이전 남아있던 파일들 모두 삭제되고 새로운 dist생성
    ]
}