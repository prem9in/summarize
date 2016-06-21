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
            selector: '.story_content > .sty_txt',
            titleSelector: '.story_pg_head > h1',
            summarySelector: '.story_content > .sty_txt > p:eq(1)',
            ignorePhrases: ['Hindustan Times', 'HT Media']
        },
        {
            nameKey: 'FinancialExpress',
            autodetect: function(input) {
               return input && input.indexOf('www.financialexpress.com/') > 0;
            },
            selector: '.main-story-content',
            titleSelector: '.storybox > h1',
            summarySelector: '.storybox > h2.synopsis',
            ignorePhrases: []
        },
        {
            nameKey: 'TOI',
            autodetect: function(input) {
                return input && input.indexOf('timesofindia.indiatimes.com/') > 0;
            },
            selector: '.article_content',
            titleSelector: '.title_section > h1',
            summarySelector: '.artsyn',
            ignorePhrases: ['Times of India', 'TOI']
        },
        {
            nameKey: 'CNN',
            autodetect: function(input) {
                return input && input.indexOf('www.cnn.com/') > 0;
            },
            selector: '.zn-body__paragraph',
            titleSelector: '.pg-headline',
            summarySelector: '.zn-body__paragraph:first',
            ignorePhrases: ['CNN']
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