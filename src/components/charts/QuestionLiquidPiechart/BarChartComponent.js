import React from 'react';
import { observer } from "mobx-react";
import LoadingIndicator from '../../LoadingIndicator';
import './barStyle.css';

const CHART_HEIGHT = 200;

const BarChartComponent = observer(class BarChartComponent extends React.Component{
	constructor(){
		super()
		this.state = {
			sorted: null
		}
	}

	handleTap = () => {
		let sorted = this.state.sorted;
		if (sorted === null) this.setState({sorted: true})
		else this.setState({sorted: !sorted})
	}

	render(){
		//console.log('this.props', this.props)
		let sorted = []
		if (this.props.data.values){
			if (this.state.sorted === null) {sorted = this.props.data.values}
			else if (this.state.sorted) {sorted = this.props.data.values.sort((a,b)=> -b.value+a.value)}
			else if (!this.state.sorted) {sorted = this.props.data.values.sort((a,b)=> -a.value+b.value)}
		}

	return (
    <div>
      {!this.props.data.values && <LoadingIndicator />}
      {this.props.data.values &&
        <div style={{minHeight: CHART_HEIGHT}}>
				<div className='message'>{this.state.sorted === null ? <span><i>Click on any bar to sort</i></span> : null}</div>
				{
					sorted.map((d, i) => {
					return (
						<div key={`bar-${i}`} >
							<ContainerBar {...d} handleTap={() => this.handleTap()}/>
						</div>
					)
				})
        }
				</div>}
    </div>
    );
  }})


class ContainerBar extends React.Component{
	state={
    activeEltIndex: '',
		direct_vote_count: ''
  }
  handleMouseEnter = (e) => {
    this.setState({activeEltIndex: this.props.name})
		this.setState({direct_vote_count: this.props.direct_vote_count})
  }
	handleMouseLeave = (e) => {
		this.setState({activeEltIndex: '', direct_vote_count: ''})
	}
	render(){
	return (
		<div className='bg_bar'
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}
					onTouchTap={this.props.handleTap}
					title={`Direct vote count: ${this.state.direct_vote_count}`}>
		    <Bar {...this.props}
					activeEltIndex={this.state.activeEltIndex}
					direct_vote_count={this.state.direct_vote_count}/>
		    <Percentage {...this.props}/>
		</div>
)}}


const Bar = (props) => {
	const width = Math.round(props.percentage*0.7*window.innerWidth/100)
  const style = Object.assign({}, {
      backgroundColor: props.fill,
      width: props.activeEltIndex ? width*1.1 : width
      })
	const display = props.direct_vote_count && window.innerWidth > 800 ?
		`${props.full_name}....Direct vote count: ${props.direct_vote_count}` :
		props.full_name

	return (
	  <div className='bar' style={style}>
     {display}
	  </div>
)}


const Percentage = (props) => (
	//console.log('percentage props', props)
  <div className='percentage' style={{color: props.fill}}>
		{`${props.percentage}%`}
		{/* {props.my_vote ? `...My vote` : ''} */}
	</div>
)

export default BarChartComponent;
