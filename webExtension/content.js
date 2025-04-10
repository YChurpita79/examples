const bet365ParserRoot = '.bet365ParserRoot{' +
    'display: none; ' +
    'grid-template-rows: 5% 40% 40% 1fr;' +
    'position: fixed; ' +
    'background-color: #ffffff; ' +
    'flex-direction: column; ' +
    'justify-content:center; ' +
    'align-items:center; ' +
    'width:300px;' +
    'padding:20px; ' +
    'height:100vh; ' +
    'right:0px; ' +
    'top:0px; ' +
    'z-index:9999; };';

const bet365ParserRootContentWrapper = '.bet365ParserRootContentWrapper{' +
    'margin-top: 30px;' +
    'height: 100%;' +
    'display:flex;' +
    'align-items:center;' +
    'flex-direction: column; };'

const bet365ParserRootContentTitle = '.bet365ParserRootContentTitle{' +
    'display:block;' +
    'position:relative;' +
    'width:100%;' +
    'text-align:center;' +
    'text-shadow: 1px 5px 1px #0267ff;' +
    'color: #800ee1;' +
    'font-size:30px; };'

const bet365ParserRootClassInput = '.bet365ParserRootClassInput{' +
    'display: block;' +
    'resize: none;' +
    'margin-top:30px;' +
    'position:relative;' +
    'border-radius: 5px;' +
    'border: solid 1px #ddd;' +
    'padding: 10px;' +
    'width:100%; };'

const bet365ParserRootGenerateClick = '.bet365ParserRootGenerateClick{' +
    'display: block;' +
    'cursor:pointer;' +
    'height:40px;' +
    'background-color: #0089f0;' +
    'color:white;' +
    'position:relative;' +
    'margin-top:30px;' +
    'border:none;' +
    'transition: 0.5s all;' +
    'box-shadow: 0 0 5px grey;' +
    'border-radius: 5px;' +
    'width:100%; };'

const bet365ParserRootGenerateClickHover = '.bet365ParserRootGenerateClick:hover{' +
    'box-shadow: 0 0 8px #620080;' +
    '};'

const bet365ParserRootSendHtml = '.bet365ParserRootSendHtml{' +
    'display: block;' +
    'cursor:pointer;' +
    'height:40px;' +
    'background-color:#9b00ff;' +
    'color:white;' +
    'position:relative;' +
    'border:none;' +
    'margin-top:30px;' +
    'box-shadow: 0 0 5px grey;' +
    'border-radius: 5px;' +
    'width:100%; };'

const bet365ParserRootSendHtmlHover = '.bet365ParserRootSendHtml:hover{' +
    'box-shadow: 0 0 8px #620080;' +
    '};'

const bet365ParserRootBackendUrlInput = '.bet365ParserRootBackendUrlInput{' +
    'display: block;' +
    'resize: none;' +
    'margin-top:30px;' +
    'position:relative;' +
    'border-radius: 5px;' +
    'border: solid 1px #ddd;' +
    'padding: 10px;' +
    'width:100%; };'

const bet365ParserRootClassOutput = '.bet365ParserRootClassOutput{' +
    'display: block;' +
    'resize: none;' +
    'margin-top:30px;' +
    'color: blue;' +
    'position:relative;' +
    'border-radius: 5px;' +
    'border: solid 1px #ddd;' +
    'padding: 10px;' +
    'width:100%; };'

const bet365ldsRoller = '.lds-roller {' +
    'display: inline-block;' +
    'position: relative;' +
    'width: 80px;' +
    'height: 80px;}'

const bet365ldsRollerDiv = '.lds-roller div {' +
    'animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;' +
    'transform-origin: 40px 40px;}'

const bet365ldsRollerDivAfter = '.lds-roller div:after {' +
    'content: " ";' +
    'display: block;' +
    'position: absolute;' +
    'width: 7px;' +
    'height: 7px;' +
    'border-radius: 50%;' +
    'background: #fff;' +
    'margin: -4px 0 0 -4px;}'

const bet365ldsRollerDivChild = '.lds-roller div:nth-child(1) {' +
    'animation-delay: -0.036s;}'

const bet365ldsRollerDivChildAfter = '.lds-roller div:nth-child(1):after {' +
    'top: 63px;'
'left: 63px;}'

const bet365ldsRollerDivChild2 = '.lds-roller div:nth-child(2) {' +
    'animation-delay: -0.072s;}'

const bet365ldsRollerDivChild2After = '.lds-roller div:nth-child(2):after {' +
    'top: 68px;' +
    'left: 56px;}'
const bet365ldsRollerDivChild3 = '.lds-roller div:nth-child(3) {' +
    'animation-delay: -0.108s;}'
const bet365ldsRollerDivChild3After = '.lds-roller div:nth-child(3):after {' +
    'top: 71px;' +
    'left: 48px;}'

const bet365ldsRollerDivChild4 = '.lds-roller div:nth-child(4) {' +
    'animation-delay: -0.144s;}'

const bet365ldsRollerDivChild4After = '.lds-roller div:nth-child(4):after {' +
    'top: 72px;' +
    'left: 40px;}'

const bet365ldsRollerDivChild5 = '.lds-roller div:nth-child(5) {' +
    'animation-delay: -0.18s;}'

const bet365ldsRollerDivChild5After = '.lds-roller div:nth-child(5):after {' +
    'top: 71px;' +
    'left: 32px;}'
const bet365ldsRollerDivChild6 = '.lds-roller div:nth-child(6) {' +
    'animation-delay: -0.216s;}'

const bet365ldsRollerDivChild6After = '.lds-roller div:nth-child(6):after {' +
    'top: 68px;' +
    'left: 24px;}'
const bet365ldsRollerDivChild7 = '.lds-roller div:nth-child(7) {' +
    'animation-delay: -0.252s;}'
const bet365ldsRollerDivChild7After = '.lds-roller div:nth-child(7):after {' +
    'top: 63px;' +
    'left: 17px;}'
const bet365ldsRollerDivChild8 = '.lds-roller div:nth-child(8) {' +
    'animation-delay: -0.288s;}'

const bet365ldsRollerDivChild8After = '.lds-roller div:nth-child(8):after {' +
    'top: 56px;' +
    'left: 12px;}'
const bet365ldsRollerKeyFrame = '@keyframes lds-roller {' +
    '0% {transform: rotate(0deg);}' +
    '100% { transform: rotate(360deg);}}'

const bet365ldsRollerWrapper = '.lds-roller-wrapper {' +
    'display:none;' +
    'position: absolute;' +
    'background-color:#270c83ad;' +
    'z-index:1111;' +
    'width: 100%;' +
    'height: 100%;' +
    'top: 0;' +
    'left: 0;' +
    'align-items: center;' +
    'justify-content: center;'

const styleArray = [bet365ParserRoot, bet365ParserRootContentWrapper, bet365ParserRootContentTitle, bet365ParserRootClassInput,
    bet365ParserRootGenerateClick, bet365ParserRootGenerateClickHover, bet365ParserRootSendHtml, bet365ParserRootBackendUrlInput, bet365ParserRootSendHtmlHover, bet365ldsRoller, bet365ldsRollerDiv,
    bet365ldsRollerDivAfter, bet365ldsRollerDivChild, bet365ldsRollerDivChildAfter, bet365ldsRollerDivChild2, bet365ldsRollerDivChild2After,
    bet365ldsRollerDivChild3, bet365ldsRollerDivChild3After, bet365ldsRollerDivChild4, bet365ldsRollerDivChild4After, bet365ldsRollerDivChild5,
    bet365ldsRollerDivChild5After, bet365ldsRollerDivChild6, bet365ldsRollerDivChild6After, bet365ldsRollerDivChild7, bet365ldsRollerDivChild7After,
    bet365ldsRollerDivChild8, bet365ldsRollerDivChild8After, bet365ldsRollerWrapper, bet365ldsRollerKeyFrame, bet365ParserRootClassOutput
]


/***********************************************************************************************************************
 * This is storage srvice service
 **********************************************************************************************************************/

class StorageService {
    saveData = (cname, cvalue) => {
        localStorage.setItem(cname, cvalue);
    };

    getData = (cname) => {
        return localStorage.getItem(cname);
    };

    checkData = (cname) => {
        const user = this.getData(cname);
        return user !== '' && user !== null;
    };

    deleteData = (name) => {
        this.saveData(name, null);
    };
}

const panel =
    `<div class="bet365ParserRoot">
          <h3  class="bet365ParserRootContentTitle">Bet365 parser panel</h3>
          <div class="bet365ParserRootContentWrapper">
            <input class="bet365ParserRootBackendUrlInput" typeof="text" placeholder="This field for backend url"/>
            <textarea rows="10" cols="50" class="bet365ParserRootClassInput" placeholder="You should put html class in it"></textarea>
            <button class="bet365ParserRootGenerateClick" >immediate Click on the elements</button> 
          </div>
          <button class="bet365ParserRootSendHtml" >send html to backend</button>
              <textarea rows="4" cols="50" class="bet365ParserRootClassOutput" placeholder="The status response"></textarea>
          <div class="lds-roller-wrapper">
             <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> 
          </div>
    </div>`


class PanelConstructor {

    constructor() {
        this.storgageService = new StorageService();
        this.nodeElm = document.getElementsByTagName('body')[0];
        this.clickClassNames = [];
        this.backendUrl = 'https://bet.miber.se/api/bet365/parse';
        this.initStyles();
        this.checkStorage();
    };

    initStyles = () => {
        try {
            let c = 0;
            while (c < styleArray.length) {
                this.addStyleSheet(styleArray[c]);
                c++;
            }
        } catch (e) {
            console.error(e);
        }
    }

    addStyleSheet = (rules) => {
        const head = document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        const rule = document.createTextNode(rules);
        style.type = 'text/css';
        if (style.styleSheet) style.styleSheet.cssText = rule.nodeValue; else style.appendChild(rule);
        head.appendChild(style);
    };


    sendHtml = () => {
        const markup = document.documentElement.innerHTML;
        const host = location.href;
        const getInputElement = document.querySelector('.lds-roller-wrapper');
        const style = window.getComputedStyle(getInputElement)

        if (style.display === 'none') {
            getInputElement.style.display = "flex";
        }


        new Promise((resp, rej) => {
            chrome.runtime.sendMessage({
                'contentScriptQuery': 'getData',
                'data': markup,
                'clientUrl': host,
                'url': this.backendUrl
            }, (response) => {
                if (typeof response !== 'undefined' && response !== '') {
                    resp(response);
                } else {
                    resp({data: undefined});
                }
            });

        }).then((responce) => {
            const res = responce.data;
            const getbet365ParserRootClassOutputElement = document.querySelector('.bet365ParserRootClassOutput');

            if (res.status === 200) {
                getInputElement.style.display = "none";
                getbet365ParserRootClassOutputElement.value = `Server has answered - ${res.status}`
            } else {
                getInputElement.style.display = "none";
                getbet365ParserRootClassOutputElement.value = `Server has answered - ${res.status}`
                console.error('Server has answered -', res.status)
            }

        });


    }

    checkStorage = () => {
        try {
            if (this.storgageService.checkData('clickClassList')) {
                this.clickClassNames = this.storgageService.getData('clickClassList')?.split(',');
            }
            if (this.storgageService.checkData('backendUrlBet')) {
                this.backendUrl = this.storgageService.getData('backendUrlBet');
            }

        } catch (e) {
            console.error(e);
        }

    }

    init = () => {
        try {
            if (typeof this.nodeElm === 'undefined') {
                throw new Error('The body is undefined');
            }

            this.wrapper = document.createElement('div');
            this.wrapper.innerHTML = panel;
            this.nodeElm.appendChild(this.wrapper);

            const getInputElement = document.querySelector('.bet365ParserRootClassInput');
            getInputElement.value = this.clickClassNames?.join(';') ? this.clickClassNames?.join(';') : '';

            const getElementButtonClick = document.querySelector('.bet365ParserRootGenerateClick');
            const getElementUrlInput = document.querySelector('.bet365ParserRootBackendUrlInput');
            getElementUrlInput.value = this.backendUrl;

            const getElementSendHtml = document.querySelector('.bet365ParserRootSendHtml');

            getInputElement.addEventListener('change', (e) => {
                const value = e.target.value;
                this.clickClassNames = value.split(';');
                this.storgageService.saveData('clickClassList', this.clickClassNames);
            })

            getElementButtonClick.addEventListener('click', () => {
                let c = 0;
                do {
                    const className = this.clickClassNames[c];
                    const selector = document.getElementsByClassName(className);

                    for (let v = 0; v < selector.length; v++) {
                        selector[v].click();
                    }
                    c++;
                } while (c < this.clickClassNames.length)

            })


            getElementUrlInput.addEventListener('change', (e) => {
                this.backendUrl = e.target.value.trim();
                this.storgageService.saveData('backendUrlBet', this.backendUrl);
            });

            getElementSendHtml.addEventListener('click', this.sendHtml);


        } catch (e) {
            console.error(e);
        }

    };

}


const construct = new PanelConstructor();
construct.init();
