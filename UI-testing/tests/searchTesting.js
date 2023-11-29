// module.exports = {
//     beforeEach: function (browser) {
//         browser.page.homepage()
//             .navigate()
//     },
//     'homePage should load successfully and search Box should be visible to user' (browser) {

//         browser.page.homepage()
//             .assert.title('My Store')
//             .assert.elementPresent('@searchBox')
//             .assert.visible('@searchBox')
//     },

//     'searching for "dress" should retrieve results and be visible to the user' (browser) {
//         const query = 'dress'

//         browser.page.homepage()
//             .waitForElementVisible('@searchBox')
//             .updateValue('@searchQuery', query)
//             .saveScreenshot('../tests_output/screenshot.png')
//             .click('@submitSearch')
//             .waitForElementPresent('@productList')
//             .waitForElementVisible('@productList')
//             .assert.visible('@products')
//             .expect.elements('@products').count.to.not.equal(0)
//     },

//     'searching for "dress" should display "search DRESS" on the top of the results' (browser) {
//         const query = 'dress'

//         browser.page.homepage()
//             .waitForElementVisible('@searchBox')
//             .updateValue('@searchQuery', query)
//             .saveScreenshot('../tests_output/screenshot.png')
//             .click('@submitSearch')
//             .waitForElementPresent('@productList')
//             .waitForElementVisible('@productList')
//             .expect.element('@productListItem').text.to.contain(query.toUpperCase())
//     },

//     afterEach: function (browser) {
//         browser.end();
//     }
// }