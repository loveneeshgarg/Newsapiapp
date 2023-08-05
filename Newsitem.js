import React, { Component } from 'react'

export default class Newsitem extends Component {
  render() {
    let{title,description,url,urlToImage,author,date} =this.props;
    return (

      <div className='container d-flex justify-content-around'>
        <div className="card my-3 " style={{width: "20rem"}}>
          <img src={urlToImage} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted"> By {author?author:"unknown"} on {date}</small></p>
            <a  rel="noreferrer" href={url} target="_blank" className="btn btn-primary">READ MORE</a>
          </div>
        </div>

      </div>
    )
  }
}
