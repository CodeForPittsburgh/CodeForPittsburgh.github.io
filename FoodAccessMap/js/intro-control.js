function startIntro() {
    var intro = introJs();
    intro.setOptions({
        steps: [
            {
                intro: 'Welcome to the Pittsburgh Food Access Map! 👋 This tutorial will show you how to use the map.',
            },
            {
                element: '#searchInput',
                intro: 'You can use search bar to focus the map on a specific address or area of the city.',
                position: 'right'
            },
            {
                element: '#filtersPane',
                intro: 'Select filters to limit what kinds of food sources you would like to view',
                position: 'right'
                
            },
            {
                intro: '👆 Click anywhere on the map to get a list of nearby food resources.',
                position: 'right'
                
            },
            {
                element: '#view-tutorial',
                intro: 'If you need to see these instructions again you can click the View Tutorial button at any time.',
                position: 'right'
            }
        ],
    });
    
    intro.onbeforechange(function () {
        if (this._currentStep === 2) {
            sidebar.open('home');
        }
    });
    intro.start();
}

function radiusIntro() {
    var intro = introJs();
    intro.setOptions({
        scrollToElement: false,
        steps: [
            {
                element: '#resultTab',
                intro: 'The results tab shows a list of food sources within the circle marked on the map.',
                position: 'right'
            },
            {
                element: '#radiusSlider',
                intro: 'You can change the raidus of the circled area with this slider.',
                position: 'right'
            },
            {
                element: '#reset-radius',
                intro: 'You can clear the circle on the map and the list of locations below using the Clear Results button.',
                position: 'right'
            },
        ],
    });
    intro.start();
}