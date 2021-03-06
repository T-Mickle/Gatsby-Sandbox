import React from "react"
import { css } from "@emotion/core"
import { Link, StaticQuery, graphql  } from "gatsby"
// import { getUser, isLoggedIn, logout } from "../services/auth"
import auth from '../utils/auth'

import { rhythm } from "../utils/typography"

export default class Layout extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      
    }
  }

   login () {
     auth.login()

    

     this.setState({
      authenticated: auth.isAuthenticated(),
     
    })

    


  }

  logout() {
    auth.logout()

    this.setState({
      authenticated: auth.isAuthenticated(),
    })
  }

  componentDidMount () {

    const { renewSession } = auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
    
    this.setState({
      authenticated: auth.isAuthenticated(),
    })
  }

  
  
 render () { 

  const content = { message: "", login: true }
  if (this.state.authenticated ) {
    content.message = `Hello, ${auth.getUserName()}`
  } else {
    content.message = "You are not logged in"
  }
   return (
    <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
}
    render={data => (
  <div
    css={css`
      margin: 0 auto;
      max-width: 700px;
      padding: ${rhythm(2)};
      padding-top: ${rhythm(1.5)};
    `}
  >
  
    <Link to={`/`}>
      <h3
        css={css`
          margin-bottom: ${rhythm(3)};
          display: inline-block;
          font-style: normal;
        `}
      >
         {data.site.siteMetadata.title} 
      </h3>
    </Link>
    <span css={css`
        float: right;
        margin-left: 20px;
      `} >{content.message}</span> 
    <Link
      to={`/about/`}
      css={css`
        float: right;
      `}
    >
      About
    </Link>

   {this.state.authenticated && (
     <Link css={css`
     float: right;
     margin-right: 10px
   `} to="/app/profile">Profile</Link> 
   )} 
    {/* {isLoggedIn() ? (
          <a css={css`
          float: right;
          margin-right: 20px
        `}
            href="/"
            onClick={event => {
              event.preventDefault()
              logout(() => navigate(`/app/login`))
            }}
          >
            Logout
          </a>
        ) : null} */}

{!this.state.authenticated && (
            <span>
              <a
                href="#"
                onClick={this.login.bind(this)}
                style={{
                  boxShadow: 'none',
                  lineHeight: '37px',
                }}
              >
                Log In
              </a>
            </span>
          )}

{this.state.authenticated && (
            <div>
              <a
                href="#"
                onClick={this.logout.bind(this)}
                style={{
                  boxShadow: 'none',
                  lineHeight: '37px',
                  float: 'right'
                }}
              >
                Log Out
                {auth.getUserName() && <span> ({auth.getUserName()})</span>}
              </a>
              </div>
               )}



        
    {this.props.children}
  </div>
   )}
   />
)
          } 
    }