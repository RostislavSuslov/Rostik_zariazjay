const player = {
    stateOfButton: [{
            key: 65,
            btn: 'A',
            name: '1.mp3'
        },
        {
            key: 83,
            btn: 'S',
            name: '2.mp3'
        },
        {
            key: 68,
            btn: 'D',
            name: '3.mp3'
        },
    ]
}

player._initialButtons = function () {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('keys');

    this.stateOfButton.forEach((element, index) => {
        const button = document.createElement('div');
        button.setAttribute('data-key', element.key)
        button.setAttribute('data-audio', index + 1);
        button.classList.add('key');
        button.insertAdjacentHTML('afterbegin', `
            <kkd>${element.btn}</kkd>
            <div class="sound">${element.name}</div>
        `)

        buttonWrapper.appendChild(button);
    })

    document.querySelector('body').prepend(buttonWrapper);

    return buttonWrapper
}

player.act = function () {
    const $buttons = this._initialButtons();

    return {
        delayTratata: function Rostik_zariazjay(keyCode) {
            const pressedButton = $buttons.querySelector(`[data-key='${keyCode}']`);
            if (!!pressedButton) {
                pressedButton.classList.add('playing');
                new Audio(`/mp3/${pressedButton.getAttribute('data-audio')}.mp3`).play();

                pressedButton.addEventListener('transitioned', function ({
                    propertyName
                }) {
                    (propertyName === 'transform' && this.classList.remove('playing'))
                });
            }
        }
    }
}

window.addEventListener('load', () => {
    const {delayTratata} = player.act();

    this.addEventListener('keydown', function getPressedButtonKeyCode({KeyCode}) {
        delayTratata(keyCode)
    })
})