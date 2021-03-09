//
// The core code needed to perform the business logic is between this comment...
//

import {headlineOptimizer} from '../bandito.js'

var api_key_for_bandito = 'cILEqAj8kK9qphdlGRTmZ3LLwBs0s0mE9vgDFz2z'
var headlines_to_consider = [
    '<text style="color: blue;">Take the blue pill</text>',
    '<text style="color: red;">Take the red pill</text>',
]

var bandit = new headlineOptimizer(
    api_key_for_bandito, 
    'app_id=code_snippet_example', 
    headlines_to_consider
)

var most_recently_selected_headline = null
var map_pill_color_to_reward = {
    'red': 0,
    'blue': 1
}

async function getHeadline() {
    updateHeadline('<h2>Thinking...</h2>')

    var stopwatch_start = (new Date()).getTime()
    var selected_headline = await bandit.selectHeadline()
    var stopwatch_stop = (new Date()).getTime()

    updateLatency(`${stopwatch_stop - stopwatch_start} ms`)
    updateHeadline(`<h2>${selected_headline}</h2>`)
    updateProgress(`${(bandit.progress * 100.0) / 1.0.toFixed(2)}%`)
    return selected_headline
}

async function bluePill() {
    updateHeadline('<h2>Thinking...</h2>')
    var response = await bandit.trainMostRecentlySelectedHeadline(
        map_pill_color_to_reward['blue']
    )
    most_recently_selected_headline = await getHeadline()
}

async function redPill() {
    updateHeadline('<h2>Thinking...</h2>')
    var response = await bandit.train(
        [most_recently_selected_headline],
        [map_pill_color_to_reward['red']]
    )
    most_recently_selected_headline = await getHeadline()
}

async function restart() {
    updateHeadline('<h2>Restarting...</h2>')
    updateProgress('0%')
    var response = await bandit.restart()
    most_recently_selected_headline = await getHeadline()
}


//
// ...and this comment. The rest handles the visuals.
//


function updateHeadline(new_value) {
    var content = document.getElementById("headline")
    content.innerHTML = new_value
}

function updateProgress(new_value) {
    var content = document.getElementById("training_progress")
    content.innerHTML = new_value
}

function updateLatency(new_value) {
    var content = document.getElementById("latency")
    content.innerHTML = new_value
}

async function pull() {
    most_recently_selected_headline = await getHeadline()
}

function updateOptimizePill() {
    document.getElementById("optimizeRedPill").checked = map_pill_color_to_reward['red'] == 1
    document.getElementById("optimizeBluePill").checked = map_pill_color_to_reward['blue'] == 1
}

function changePillHasTheReward(pill_color) {
    if (
        (pill_color == 'red' && map_pill_color_to_reward['red'] == 0) ||
        (pill_color == 'blue' && map_pill_color_to_reward['blue'] == 1)
    ) {
        map_pill_color_to_reward = {
            'red': 1,
            'blue': 0
        }
    } else {
        map_pill_color_to_reward = {
            'red': 0,
            'blue': 1
        }
    }
    updateOptimizePill()
    restart()

}

// Do first pull and display update automatically when the page loads
pull()
updateOptimizePill()

// Add event listeners
document.getElementById("optimizeRedPill").addEventListener("click", function () {
    changePillHasTheReward('red')
});
document.getElementById("optimizeBluePill").addEventListener("click", function () {
    changePillHasTheReward('blue')
});
document.getElementById("redPill").addEventListener("click", function () {
    redPill()
});
document.getElementById("bluePill").addEventListener("click", function () {
    bluePill()
});
document.getElementById("restart").addEventListener("click", function () {
    restart()
});
document.getElementById("pull").addEventListener("click", function () {
    pull()
});
