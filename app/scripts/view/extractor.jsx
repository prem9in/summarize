import React from 'react';
import Base from 'view/base';
import extractor from 'model/extractor';
import $ from 'jquery';

'use strict';

export default class Extractor extends Base {
    constructor(options) {
        super(options);
        this.state={selected: extractor.get('selected'),
            available: extractor.get('available'),
            customSelector: null,
            customIgnore: null};
        if (!this.state.selected &&
            this.state.available &&
            this.state.available.length > 0) {
            this.state.selected = this.state.available[0];
        }
    }

    select(item) {
        extractor.setSelected(item);
        this.setState({selected: item});
    }

    renderExtractorOptions (){
        let options = [];
        for (let item of extractor.get('available')) {
            options.push(
                <li>
                    <a href="#" onClick={this.select.bind(this, item)}>{this.props.resources.getString(item.nameKey)}</a>
                </li>
            );
        }
        return options;
    }

    setCustomTitleSelector(event) {
        this.state.selected.titleSelector = event.target.value && event.target.value.trim();
        this.select(this.state.selected);
    }
    setCustomSummarySelector(event) {
        this.state.selected.summarySelector = event.target.value && event.target.value.trim();
        this.select(this.state.selected);
    }
    setCustomSelector(event) {
        this.state.selected.selector = event.target.value && event.target.value.trim();
        this.select(this.state.selected);
    }

    setCustomIgnore (event) {
        this.state.selected.ignorePhrases = event.target.value && event.target.value.trim().split(',');
        this.select(this.state.selected);
    }

    render() {

        return (
                <div className="form-group row">
                    <div className="col-sm-2"><label>{this.props.resources.getString("SelectExtractor")}</label></div>
                    <div className="col-sm-2">
                        <div className="dropdown">
                            <button className="btn btn-default dropdown-toggle" type="button" id="extractorSelector" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                {this.props.resources.getString(this.state.selected.nameKey)}
                                <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="extractorSelector">
                                {this.renderExtractorOptions()}
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className={this.state.selected.nameKey == 'AutoDetect' ? 'displaynone' : ''} >
                            <div className="form-group">
                                <label for="titleSelectorInput">{this.props.resources.getString("TitleSelector")}</label>
                                <div className={this.state.selected.nameKey == 'Custom' ? 'displaynone' : 'contentSelector'}>
                                    {this.state.selected.titleSelector && this.state.selected.titleSelector.length > 0 ? this.state.selected.titleSelector : ''}
                                </div>
                                <div className={this.state.selected.nameKey == 'Custom' ? 'contentSelector' : 'displaynone'}>
                                    <input type="text" id="titleSelectorInput" onChange={this.setCustomTitleSelector.bind(this)} value={this.state.selected.titleSelector && this.state.selected.titleSelector.length > 0 ? this.state.selected.titleSelector : ''} className="sourceInput form-control" placeholder={this.props.resources.getString("TitleSelectorPlaceholder")} title={this.props.resources.getString("TitleSelectorPlaceholder")} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="summarySelectorInput">{this.props.resources.getString("SummarySelector")}</label>
                                <div className={this.state.selected.nameKey == 'Custom' ? 'displaynone' : 'contentSelector'}>
                                    {this.state.selected.summarySelector && this.state.selected.summarySelector.length > 0 ? this.state.selected.summarySelector : ''}
                                </div>
                                <div className={this.state.selected.nameKey == 'Custom' ? 'contentSelector' : 'displaynone'}>
                                    <input type="text" id="summarySelectorInput" onChange={this.setCustomSummarySelector.bind(this)} value={this.state.selected.summarySelector && this.state.selected.summarySelector.length > 0 ? this.state.selected.summarySelector : ''} className="sourceInput form-control" placeholder={this.props.resources.getString("SummarySelectorPlaceholder")} title={this.props.resources.getString("SummarySelectorPlaceholder")} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="selectorInput">{this.props.resources.getString("Selector")}</label>
                                <div className={this.state.selected.nameKey == 'Custom' ? 'displaynone' : 'contentSelector'}>
                                    {this.state.selected.selector && this.state.selected.selector.length > 0 ? this.state.selected.selector : ''}
                                </div>
                                <div className={this.state.selected.nameKey == 'Custom' ? 'contentSelector' : 'displaynone'}>
                                    <input type="text" id="selectorInput" onChange={this.setCustomSelector.bind(this)} value={this.state.selected.selector && this.state.selected.selector.length > 0 ? this.state.selected.selector : ''} className="sourceInput form-control" placeholder={this.props.resources.getString("SelectorPlaceholder")} title={this.props.resources.getString("SelectorPlaceholder")} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="ignoreInput">{this.props.resources.getString("IgnorePhrase")}</label>
                                <div className={this.state.selected.nameKey == 'Custom' ? 'displaynone' : 'ignorePhrases'}>
                                    {this.state.selected.ignorePhrases && this.state.selected.ignorePhrases.length > 0 ? this.state.selected.ignorePhrases.join(',') : ''}
                                </div>
                                <div className={this.state.selected.nameKey == 'Custom' ? 'ignorePhrases' : 'displaynone'}>
                                    <input type="text" id="ignoreInput" onChange={this.setCustomIgnore.bind(this)} value={this.state.selected.ignorePhrases && this.state.selected.ignorePhrases.length > 0 ? this.state.selected.ignorePhrases.join(',') : ''} className="sourceInput form-control" placeholder={this.props.resources.getString("IgnorePhrasePlaceholder")} title={this.props.resources.getString("IgnorePhrasePlaceholder")} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
