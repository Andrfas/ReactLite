import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import { grey100, cyan600, orange500, indigo500 } from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
//import Dialog from 'material-ui/Dialog';
//import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

//import MessengerCheckboxPlugin from '../MessengerCheckboxPlugin';
import FacebookBox from 'material-ui-community-icons/icons/facebook-box';
import smallLogo from './represent_white_outline.svg';
import './RegisterNewUser.css';

const styles = {
  containerStyle: {
    padding: '10px 20px',
    maxWidth: 420,
    minWidth: 270,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  imgStyle: {
    height: '30px',
    verticalAlign: 'middle',
    margin: 10,
    marginLeft: '45%',
  },
  floatingLabelText: {
    color: cyan600
  },
  facebookLoginStyle: {
    display: 'inline-block',
    width: '100%',
    color: 'white',
    backgroundColor: indigo500
  },
  txtStyle: {
    color: cyan600
  }
}

const Page1 = (props) => {

  const attemptNextPage = () => {
    if (!props.agreedTermsValue) {
      props.displayProblem();
    }
    else {
      props.nextPage()
    }
  }
  return (
    <div style={{width: '100%', height: '100%'}}>
      <Paper zDepth={0} className='containerStyle'>
        <img src={smallLogo} style={styles.imgStyle} />
        <p style={{margin: '10px 0'}}>
          {`Welcome! We're happy to have you join 17,394 others
          who are using Represent to build a better, modern democracy `}
          <Link to="#"><span style={{fontSize: 14}}>Learn more</span></Link>
        </p>

        <Checkbox onCheck={props.agreedTerms}
            label={
              <span>
                By joining you agree to the <a href="https://represent.me/legal/terms/">terms and conditions</a> and <a href="https://represent.me/legal/privacy-policy/">privacy policy</a><br/>
              </span>
            }
            labelPosition='right'
            style={{margin: '20px 0px'}}
            labelStyle={{fontSize: '12px', fontWeight: 'bold', textAlign: 'left'}}
            value={props.agreedTermsValue}
            checked={props.agreedTermsValue}
            />

        <div>
          {props.agreedTermsValue ? <FacebookLogin
            appId={String(window.authSettings.facebookId)}
            autoLoad={false}
            fields="name,email,picture"
            callback={props.facebookCallback}
            style={styles.facebookLoginStyle}
            textButton="login with Facebook"
            buttonStyle={{cursor: 'pointer', width: '100%', paddingBottom: 7, paddingTop: 5, textAlign: 'middle'}}
            disableMobileRedirect={true}
            icon={<FacebookBox color='white' style={{verticalAlign: 'middle', marginRight: 10}}/>}

            /> :

            <RaisedButton
              label={<span className='fbMockButton'>login with facebook</span>}
              primary={true}
              onTouchTap={attemptNextPage}
              buttonStyle={{backgroundColor: indigo500}}
              style={{width: '100%'}}
              icon={<FacebookBox color='lightgrey' />}
            />}
        </div>
        <p style={{fontSize: 12, marginTop: 10, marginBottom: 20}}>
          We'll never post without your permission
        </p>

        <p style={{color: orange500}}>{props.problem}</p>

        <div>
          <div className='button'
            onTouchTap={attemptNextPage}
            style={{backgroundColor: grey100, color: 'black'}}
            >Create an account
          </div>
          <div className='button'
            onTouchTap={props.redirectToLogin}
            style={{backgroundColor: grey100, color: 'black'}}
            >Already have an account? Login
          </div>
        </div>

        <p style={{textAlign: 'center', fontSize: '12px', cursor: 'pointer'}}>
          <a href='https://app.represent.me/access/forgot-password/'>
            Forgotten your password?
          </a>
        </p>

      </Paper>
    </div>

  )
}

export default Page1;
