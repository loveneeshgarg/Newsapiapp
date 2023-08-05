import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';

export default class News extends Component {
  articles = []
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      page: 1,
      loading:false
    }
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ffdcb52788644fb09be6a204fb48b38b&pagesize=${this.props.pagesize}&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({ articles: parsedata.articles,totalresults:parsedata.totalresults })

  }
  handlePreviousClick= async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ffdcb52788644fb09be6a204fb48b38b&pagesize=${this.props.pagesize}&page=${this.state.page - 1}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({ articles: parsedata.articles,
      page: this.state.page- 1,
      loading:false
    }
      )
      

  }
  handleNextClick= async ()=>{
    if(this.state.page+1>Math.ceil(this.state.totalresults/this.props.pagesize))
    {}
    else{
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ffdcb52788644fb09be6a204fb48b38b&pagesize=${this.props.pagesize}&page=${this.state.page + 1}`;
      this.setState({loading:true})
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({ articles: parsedata.articles,
      page: this.state.page+1,
      loading:false})
      
        
      
    }
    
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center">Moneynews- top News Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <Newsitem title={element.title ? element.title.slice(0, 55) : " "} description={element.description ? element.description.slice(0, 80) : "click to read"} urlToImage={element.urlToImage ? element.urlToImage : `https://heise.cloudimg.io/bound/1200x1200/q85.png-lossy-85.webp-lossy-85.foil1/_www-heise-de_/imgs/18/3/5/9/5/4/4/3/ct1922mail3chec_andreas_martini_121201_rei_final_online-34a0efad6a4b85d7.jpg&pagesize=${this.props.pagesize}`} url={element.url} author={element.author} date={element.publishedAt}/>
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-around my-5">
        <button disabled={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={this.state.page +1 > Math.ceil(this.state.totalresults/18)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
        </div>
      </div>


    )
  }
}
