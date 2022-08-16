function startIntro() {
    var intro = introJs();
    intro.setOptions({
        steps: [
            {
                intro:
                    'Welcome to the Pittsburgh Food Access Map! 👋 This tutorial will show you how to use the map.',
            },
            {
                element: '#step2',
                intro:
                    'You can click the search button to start searching for nearby food sources. ',
                position: 'bottom',
            },
            {
                element: '#filtersPane',
                intro:
                    'Select filters to limit what kinds of food sources you would like to view',
                position: 'bottom',
            },
        ],
    });
    intro.onbeforechange(function () {
        if (this._currentStep === 2) {
            sidebar.open('search');
        }
    });
    intro.start();
}