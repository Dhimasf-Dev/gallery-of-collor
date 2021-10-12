import React from 'react'
import './Home.scss'

//Declare type
type ClickEvent = number;

interface Props {
    colorList: Array<string>
    defaultColors: Array<string>
    setColorList: (val: Array<string>) => void
}

class Home extends React.Component<Props> {

    render(){
        return (
            <div className='Home'>
                {
                    this.props.colorList.map((color, index) => {
                        //for(let a = 0; a < this.props.defaultColors.length; a++){     ==> this loop
                            return (
                                <div key={index}>
                                    <div style={{background: color}} className='cardColor'></div>
                                    <div className='cardFooter'>
                                        <div>{color}</div>
                                        {     
                                            // filtering for button close 
                                            // *the problem because missmatch between data defaultColors & data colorList/color 
                                            // I've tried using for loop nesting but it doesn't work
                                            this.props.defaultColors[index] === color ? 
                                            <div></div> :
                                            <button className='close' onClick={()=>this.onDelete(index)}>X</button>                                       
                                        }
                                    </div>
                                </div>                     
                            );
                        //}
                    })
                }
            </div>
        )             
    }

    //Delete Function
    onDelete = (index: ClickEvent) => {
        //Filter by index colorList
        this.props.setColorList(this.props.colorList.filter((x, i) => i !== index))
    }
}

export default Home