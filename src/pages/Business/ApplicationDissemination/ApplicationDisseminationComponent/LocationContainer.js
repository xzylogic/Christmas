import React, { Component } from 'react';

import SearchBar from './SearchBar';

class LocationContainer extends Component {
  state = {
    param: '',
  };

  handleParamChange = e => {
    e.preventDefault();
    this.setState({
      param: e.target.value,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    console.log('search');
  };

  handleRefresh = e => {
    e.preventDefault();
    console.log('refresh');
  };

  handleNew = e => {
    e.preventDefault();
    console.log('new');
  };

  handleExport = e => {
    e.preventDefault();
    console.log('export');
  };

  render() {
    const { param } = this.state;
    return (
      <div>
        <SearchBar
          inputValue={param}
          inputPlaceholder="请输入地址名称"
          onInputChange={this.handleParamChange}
          onSearchClick={this.handleSearch}
          onRefreshClick={this.handleRefresh}
          onNewClick={this.handleNew}
          onExportClick={this.handleExport}
        />
      </div>
    );
  }
}

export default LocationContainer;
