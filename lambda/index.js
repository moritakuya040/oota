const Alexa = require('ask-sdk-core'); //require()関数でAlexa Skills Kit SDKのパッケージに含まれる「alexa-sdk」を読み込み
var answer = [];

// リクエストハンドラーを定義
// 「...を開いて」と発話した時の処理
const LaunchRequestHandler = {
    canHandle(handlerInput) {　// ハンドラーが処理すべきリクエストであればtureを返す
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest'; 
    },
    handle(handlerInput) {
        const repeat = '研究室適性検査をはじめるよ。二つの質問に答えてね。準備はいい？';
        const reprompt = '準備はいい？';
        answer.push(1);
        
        //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "Labrecommend"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                    "aplData": {
                    "skillName": "エネルギー環境工学コース",
                    "textName": "研究室紹介",
                    "secondtextName": "〜オープンキャンパスへようこそ〜",
                    "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg"
                    }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        //
        
        return handlerInput.responseBuilder // 以下responseBuilderオブジェクトの関数
            .speak(repeat) // 応答内容の文字列をセット
            .reprompt(reprompt) // Alexaからの質問にユーザーが応答しない場合の再プロンプトの文言をセット
            .getResponse(); // スキルインターフェースへの応答を生成して返す
    },
};

const FieldIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'FieldIntent'; // インテント名
    },
    handle(handlerInput){
        //const field = handlerInput.requestEnvelope.request.intent.slots.menu.value;
        
        const repeat = 'タイプワンについて二つ質問するよ。「知ってる」か「わからない」で答えてね。第一問、カーボンを知ってる？';
        const reprompt = '第一問、カーボンを知ってる？';
        answer[0]=0; 
        //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "FieldDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                    "aplData": {
                    "skillName": "エネルギー環境工学コース",
                    "textName": "研究室紹介",
                    "secondtextName": "〜オープンキャンパスへようこそ〜",
                    "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                    "comment": "以下の項目はプログラム内で動的にセットされる。(そのため、値を定義しておく必要ないんですが、ハンズオン時にオーサリングツールに直接貼り付けできるようにあえて残しています)",
                    "nowQuestionInfo": {
                        "questionDt": "カーボンを知ってる？",
                        "imageUrlA": "https://ocam.s3.ap-northeast-1.amazonaws.com/carbon.png"
                    }
                }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        
        //
        
        return handlerInput.responseBuilder // 以下responseBuilderオブジェクトの関数
            .speak(repeat) // 応答内容の文字列をセット
            .reprompt(reprompt) // Alexaからの質問にユーザーが応答しない場合の再プロンプトの文言をセット
            .getResponse(); // スキルインターフェースへの応答を生成して返す
 
    }
}

//はい
const YesIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'YesIntent'; // インテント名
    },

    handle(handlerInput) { // 実際にハンドラ－が行う処理を記述
        const speechText = '次の質問には「ある」か「ない」で答えてね。第二問、宇宙飛行士を夢見たことがある？';
        //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "YesDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                        "aplData": {
                        "skillName": "エネルギー環境工学コース",
                        "textName": "研究室紹介",
                        "secondtextName": "〜オープンキャンパスへようこそ〜",
                        "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                        "comment": "以下の項目はプログラム内で動的にセットされる。(そのため、値を定義しておく必要ないんですが、ハンズオン時にオーサリングツールに直接貼り付けできるようにあえて残しています)",
                        "nowQuestionInfo": {
                            "questionDt": "宇宙飛行士を夢見たことがある？",
                            "imageUrlA": "https://ocam.s3.ap-northeast-1.amazonaws.com/rocket.png"
                        }
                    }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        if(answer[0]===0){
            answer[0]=2;
            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }else{
            answer[0]=0;
            return handlerInput.responseBuilder
                .speak("返事を間違えちゃってるよー")
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }
    },
};

//イエス
const YestwoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'YestwoIntent'; // インテント名
    },

    handle(handlerInput) { // 実際にハンドラ－が行う処理を記述
        const speechText = 'そんな君には永島先生の研究室をおすすめするよ。 永島先生は、海水から真水を作る研究をしているよ。 観光客が多い沖縄は、水の消費が多いよ。だから真水を作れることは重要なんだ。是非興味あったら、エネ環にきてね！';
        

                //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "YestwoDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                        "aplData": {
                        "skillName": "エネルギー環境工学コース",
                        "textName": "研究室紹介",
                        "secondtextName": "〜オープンキャンパスへようこそ〜",
                        "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                        "comment": "以下の項目はプログラム内で動的にセットされる。(そのため、値を定義しておく必要ないんですが、ハンズオン時にオーサリングツールに直接貼り付けできるようにあえて残しています)",
                        "nowQuestionInfo": {
                            "questionDt": "永島研究室だよ！",
                            "primaryText1": "永島先生は、海水から真水を作る研究をしているよ。 ",
                            "primaryText2": "観光客が多い沖縄は、水の消費が多いよ。だから真水を作れることは重要なんだ。 ",
                            "primaryText3": "是非興味あったら、エネ環にきてね！",
                            "imageUrlA": "https://ocam.s3.ap-northeast-1.amazonaws.com/nagashima.png"
        }
    }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        //
        if(answer[0]===2){
            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }else{
            answer[0]=0;
            return handlerInput.responseBuilder
                .speak("返事を間違えちゃってるよー")
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }
    },
};
//野菜が好き
const YesthreeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'YesthreeIntent'; // インテント名
    },

    handle(handlerInput) { // 実際にハンドラ－が行う処理を記述
        const speechText = 'そんな君には石川先生の研究室をおすすめするよ。';
        
        //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "YesthreeDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                        "aplData": {
                        "skillName": "エネルギー環境工学コース",
                        "textName": "研究室紹介",
                        "secondtextName": "〜オープンキャンパスへようこそ〜",
                        "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                        "comment": "",
                        "nowQuestionInfo": {
                            "questionDt": "石川研究室だよ！",
                            "primaryText1": "",
                            "primaryText2": "",
                            "primaryText3": "",
                            "primaryText4": "",
                            "primaryText5": "",
                            "imageUrlA": "https://ocam.s3.ap-northeast-1.amazonaws.com/ishikawa1.png"
                        }
                }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        
        if(answer[0]===3){    
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
        }else{
            answer[0]=3;
            return handlerInput.responseBuilder
                .speak("返事を間違えちゃってるよー")
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }
    },
};
//いいえ
const NoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'NoIntent'; // インテント名
    },

    handle(handlerInput) { // 実際にハンドラ－が行う処理を記述
        const speechText = '次の質問には「はい」か「いいえ」で答えてね。第二問、風力発電に興味がある？';
        
                //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "NoDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                            "aplData": {
                            "skillName": "エネルギー環境工学コース",
                            "textName": "研究室紹介",
                            "secondtextName": "〜オープンキャンパスへようこそ〜",
                            "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                            "comment": "以下の項目はプログラム内で動的にセットされる。(そのため、値を定義しておく必要ないんですが、ハンズオン時にオーサリングツールに直接貼り付けできるようにあえて残しています)",
                            "nowQuestionInfo": {
                                "questionDt": "風力発電に興味がある？",
                                "imageUrlA": "https://ocam.s3.ap-northeast-1.amazonaws.com/furyoku.png"
                            }
                        }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        //
        if(answer[0]===0){
            answer[0]=3;
            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }else{
            answer[0]=0;
            return handlerInput.responseBuilder
                .speak("おい何やってんだよー")
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }
    },
};

//ノー
const NotwoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'NotwoIntent'; // インテント名
    },
    handle(handlerInput) { // 実際にハンドラ－が行う処理を記述
        const speechText = 'そんな君には天久先生の研究室をおすすめするよ。天久先生は、風を使って発電する風車について研究しているよ。 地球温暖化の今、自然の力を使ってエネルギーを作ることは重要なんだ。 風を扱ってエネルギーを作って、日本に名を残そうよ。是非興味あったらエネ環にきてね '
        
                //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "NotwoDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                    "aplData": {
                    "skillName": "エネルギー環境工学コース",
                    "textName": "研究室紹介",
                    "secondtextName": "〜オープンキャンパスへようこそ〜",
                    "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                    "comment": "",
                    "nowQuestionInfo": {
                        "questionDt": "天久研だよ",
                        "primaryText1": "天久先生は、風を使って発電する風車について研究しているよ。",
                        "primaryText2": "地球温暖化の今、自然の力を使ってエネルギーを作ることは重要なんだ。",
                        "primaryText3": "風を扱ってエネルギーを作って、日本に名を残そうよ。是非興味あったらエネ環にきてね",
                        "imageUrlA": "https://ocam.s3.ap-northeast-1.amazonaws.com/furyoku2.png"
                    }
                }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        //
        
        if(answer[0]===2){
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
        }else{
            answer[0]=0;
            return handlerInput.responseBuilder
                .speak("返事を間違えちゃってるよー")
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }
        
    },
};


//肉が好き
const NothreeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'NothreeIntent'; // インテント名
    },
    handle(handlerInput) { // 実際にハンドラ－が行う処理を記述
        const speechText = 'そんな君には石川先生の研究室をおすすめするよ。';
        
                //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "NothreeDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                    "aplData": {
                    "skillName": "エネルギー環境工学コース",
                    "textName": "研究室紹介",
                    "secondtextName": "〜オープンキャンパスへようこそ〜",
                    "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                    "comment": "",
                    "nowQuestionInfo": {
                        "questionDt": "石川研究室だよ！",
                        "primaryText1": "",
                        "primaryText2": "",
                        "primaryText3": "。",
                        "primaryText4": "。",
                        "primaryText5": "興味のある人はぜひエネ環にきてね！ ",
                        "imageUrlA": "https://ocam.s3.ap-northeast-1.amazonaws.com/ishikawa1.png"
                    }
                }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        //
        
        if(answer[0]===3){    
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
        }else{
            answer[0]=3;
            return handlerInput.responseBuilder
                .speak("返事を間違えちゃってるよー")
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }
        
    },
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) { 
        const speechText = '研究室適性検査をはじめるよ。二つの質問に答えてね。';
        const reprompt = '準備はいい？';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(reprompt)
            //.withSimpleCard('Hello World', speechText)
            .getResponse();
    },
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'エネ環に来てね！';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(speechText)
            .getResponse();
    },
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

        return handlerInput.responseBuilder.getResponse();
    },
};

const ErrorHandler = {
    canHandle() { 
        return true; // errorハンドラーを1つだけ定義する場合は、戻り値を常にtureに設定する
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`); // handle()関数は第2引数にerrorオブジェクトを受け取る

        return handlerInput.responseBuilder
            .speak('うまく聞き取れませんでした。')
            .reprompt('もう一度お願いします。')
            .getResponse();
    },
};

const skillBuilder = Alexa.SkillBuilders.custom(); // Alexa.SkillBuilders.custom()関数でスキルビルダーと呼ばれるオブジェクトを取得

exports.handler = skillBuilder 
    .addRequestHandlers( // 上で定義したハンドラーオブジェクトを渡す
        LaunchRequestHandler,
        FieldIntentHandler,
        YesIntentHandler,
        YestwoIntentHandler,
        NotwoIntentHandler,
        NoIntentHandler,
        NothreeIntentHandler,
        YesthreeIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler) // エラーハンドラーオブジェクトを渡す
    .lambda(); //lambda関数を呼び出し、lambda関数ハンドラーを取得、そのままexports.handlerにセット