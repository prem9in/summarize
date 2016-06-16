/**
 * Created by prprak on 6/15/2016.
 */

const extractorConfig =  {
    extractors: [
        {
            nameKey: 'AutoDetect',
            autodetect: function(input) {
                return false;
            }
        },
        {
            nameKey: 'HindustanTimes',
            autodetect: function(input) {
                return input && input.indexOf('www.hindustantimes.com/') > 0;
            },
            selector: '.story_content',
            ignorePhrases: []
        },
        {
            nameKey: 'FinancialExpress',
            autodetect: function(input) {
               return input && input.indexOf('www.financialexpress.com/') > 0;
            },
            selector: '.main-story-content',
            ignorePhrases: []
        },
        {
            nameKey: 'Custom',
            autodetect: function(input) {
                return false;
            }
        }
    ]
};

export {
    extractorConfig as
        default
};