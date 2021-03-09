
//
// The core code needed to reconstruct this demonstration is between this comment...
//

import banditoAPI from '../bandito.js'

var map_pill_color_to_reward = {
    'red': 0,
    'blue': 1
}

var most_recently_selected_feature_vector = null
var api_key_for_bandito = 'cILEqAj8kK9qphdlGRTmZ3LLwBs0s0mE9vgDFz2z'
var headlines_to_consider = {
    'blue': '<text style="color: blue;">Take the blue pill</text>',
    'red': '<text style="color: red;">Take the red pill</text>',
}
var feature_metadata = [{
    'name': 'text_to_choose',
    'categorical_or_continuous': 'categorical',
    'possible_values': ['blue', 'red']
}]
var bandit_metadata = {
    'model_id': 'app_id=code_snippet_example',
    'model_type': 'AverageCategoryMembership', // options include CovarianceLinearRegression, LinearAlgebraLinearRegression, AverageCategoryMembership
    'feature_vectors': [['blue'], ['red']],
    'feature_metadata': feature_metadata
}
var bandit = new banditoAPI(
    api_key_for_bandito,
    bandit_metadata.model_id,
    bandit_metadata.feature_metadata,
    bandit_metadata.model_type
)

async function getHeadline() {
    var content = document.getElementById("headline")
    content.innerHTML = `<h2>Thinking...</h2>`
    var action_index = await bandit.select_with_automatic_restart(
        bandit_metadata.feature_vectors,
        bandit_metadata.model_type
    )
    var content = document.getElementById("headline")
    content.innerHTML = `<h2>${headlines_to_consider[bandit_metadata.feature_vectors[action_index][0]]}</h2>`
    
    var content = document.getElementById("training_progress")
    content.innerHTML = `${(bandit.progress*100.0)/1.0.toFixed(2)}%`
    
    return bandit_metadata.feature_vectors[action_index]
}

async function bluePill() {
    var content = document.getElementById("headline")
    content.innerHTML = `<h2>Thinking...</h2>`
    var response = await bandit.train(
        [most_recently_selected_feature_vector],
        [map_pill_color_to_reward['blue']]
    )
    most_recently_selected_feature_vector = await getHeadline()
}

async function redPill() {
    var content = document.getElementById("headline")
    content.innerHTML = `<h2>Thinking...</h2>`
    var response = await bandit.train(
        [most_recently_selected_feature_vector],
        [map_pill_color_to_reward['red']]
    )
    most_recently_selected_feature_vector = await getHeadline()
}

async function restart() {
    var content = document.getElementById("headline")
    content.innerHTML = `<h2>Restarting...</h2>`
    var content = document.getElementById("training_progress")
    content.innerHTML = `0%`
    var response = await bandit.restart()
    most_recently_selected_feature_vector = await getHeadline()
}


//
// ...and this comment
//


async function pull() {
    most_recently_selected_feature_vector = await getHeadline()
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

// Do first run automatically when the page loads
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
