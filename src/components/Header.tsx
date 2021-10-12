import React, {useRef, useState, FormEvent, ChangeEvent } from 'react';
import './Header.scss'

//Declar type
type SubmitEvent = FormEvent<HTMLFormElement>;
type CheckBoxEvent = ChangeEvent<HTMLInputElement>;

interface Props {
  colorList: Array<string>,
  setColorList: (val: Array<string>) => void,
}


const Header: React.FC<Props> = ({colorList, setColorList}) => {
  //useRef : take references data from element
  const colorRef = useRef<HTMLInputElement>(null)
  
  //STATE errorFristChar: handle error frist character expect #
  const [errorFristChar, setErrorFristChar] = useState<boolean>(false)

  //STATE errorNonValid: handle error non valid data
  const [errorNonValid, setErrorNonValid] = useState<boolean>(false)

  //STATE errorTooManyChar: handle error to many or too short character
  const [errorTooManyChar, setErrorTooManyChar] = useState<boolean>(false)

  //STATE colorListDefault: handle error empty data
  const [errorEmpty, setErrorEmpty] = useState<boolean>(false)

  //STATE colorListDefault: save data default color
  const [colorListDefault, setColorListDefault] = useState<Array<string>>(colorList)


  //Function submit
  const onSubmit = (e: SubmitEvent) => {
    //preventDefault: prevent refresh
    e.preventDefault()

    //variable for save new color
    let newColor = colorRef.current?.value!

    //validasi data input
    //prevent null data
    if (newColor.length !== 0){
      //update STATE errorEmpty to false
      setErrorEmpty(false)

      //prevent error except # frist character
      if (newColor.slice(0, 1) === "#"){
        //update STATE errorFristChar to false
        setErrorFristChar(false) 
        
        //prevent error too many or too short character
        if (newColor.length === 7){
          //update STATE errorTooMany to false
          setErrorTooManyChar(false)  
          
          //prevent error non valid data
          if (!newColor.slice(1, 7).includes("#")) {
            //update STATE errorNonValid to false
            setErrorNonValid(false)

            //push data newColor to STATE colorList
            setColorList(colorList.concat(newColor))

            //push data newColor to STATE colorListDefault
            setColorListDefault(colorList.concat(newColor))
          }else {
            //update STATE errorNonValid to true if there are error
            setErrorNonValid(true)
          }
        }else {
          //update STATE errorTooMany to true if there are error
          setErrorTooManyChar(true)
        }    
      }else {
        //update STATE errorFristChar to true if there are error
        setErrorFristChar(true)
      }
    }else {
      //update STATE errorEmpty to true if there are error
      setErrorEmpty(true)

      //update STATE to false when error empty is true
      setErrorFristChar(false) 
      setErrorTooManyChar(false)
      setErrorNonValid(false)
    }
  }

  const onChange = (e: CheckBoxEvent) => {
    //variable checkValue: save checked data
    let checkValue = e.currentTarget.checked

    //varable checkId: save id data
    let checkId = e.currentTarget.id

    //variable newColorCheck: save newColor from checkbox
    let newColorCheck: Array<string> = [];

    //validasi checkbox
    if (checkValue){
      //lopping base on colorList length for checking data one by one
      for (let i = 0; i < colorList.length; i++){
        //convert HEX to RGB
        let r = parseInt(colorList[i].slice(1, 3), 16);
        let g = parseInt(colorList[i].slice(3, 5), 16);
        let b = parseInt(colorList[i].slice(5, 7), 16);     

        //validasi if red checkbox was true
        //filter r that more than 127
        if (checkId === "red" && r > 127){
          //convert RGB to HEX & push newColor data 
          newColorCheck.push("#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase())
          console.log(newColorCheck)
        }

        //validasi if green checkbox was true
        //filter g that more than 127
        if (checkId === "green" && g > 127){
          //convert RGB to HEX & push newColor data
          newColorCheck.push("#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase())
          console.log(newColorCheck)
        }

        //validasi if blue checkbox was true
        //filter b that more than 127
        if (checkId === "blue" && b > 127){
          //convert RGB to HEX & push newColor data
          newColorCheck.push("#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase())
          console.log(newColorCheck)
        }

        //validasi if saturation checkbox was true
        if (checkId === "saturation"){  
          //declare max value
          r /= 255;
          g /= 255;
          b /= 255;
        
          // Find greatest and smallest channel values
          let cmin = Math.min(r,g,b),
              cmax = Math.max(r,g,b),
              delta = cmax - cmin,
              h = 0,
              s = 0,
              l = 0;

            // Calculate hue
            if (delta === 0)
              h = 0;
            // Red is max
            else if (cmax === r)
              h = ((g - b) / delta) % 6;
            // Green is max
            else if (cmax === g)
              h = (b - r) / delta + 2;
            // Blue is max
            else
              h = (r - g) / delta + 4;
          
            h = Math.round(h * 60);
              
            // Make negative hues positive behind 360°
            if (h < 0)
                h += 360;
            
            // Calculate lightness
            l = (cmax + cmin) / 2;

            // Calculate saturation
            s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
              
            // Multiply l and s by 100
            s = +(s * 100).toFixed(1);
            l = +(l * 100).toFixed(1);

            //checked saturation
            if (s > 50){
              l /= 100;
              const a = s * Math.min(l, 1 - l) / 100;
              const f = (n: number) => {
                const k = (n + h / 30) % 12;
                const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
              };

              //convert HSL to Hex & push data newColor
              newColorCheck.push(`#${f(0)}${f(8)}${f(4)}`)
            }
        }
      }

      //update STATE colorList with new color
      setColorList(newColorCheck)
    } else {
      console.log("masuk")
      console.log(colorListDefault)

      //update STATE colorList to default data if checkbox was false
      setColorList(colorListDefault)
    }
  }

  return (
    <div className='Header'>
        <form onSubmit={onSubmit}>
            <span>Add new color: </span>
            <input type="text" ref={colorRef} />
            <input className='marginLeft' type="submit" value="Add"  />
            {/* checking if there are error */}
            { errorEmpty ? <div className='error'>Empty Input, Please fill the blank</div> : '' }
            { errorFristChar ? <div className='error'>Expect '#' in first Character</div> : '' }
            { errorNonValid ? <div className='error'>Non valid Character</div> : '' }
            { errorTooManyChar ? <div className='error'>Too many Characters or Too short Characters</div> : '' }
            <div className='border'>
              <input type="checkbox" name="redCheck" id="red" onChange={onChange} />
              <label>{"Red > 50%"}</label>

              <input className='marginLeft' type="checkbox" name="greenCheck" id="green" onChange={onChange} />
              <label>{"Green > 50%"}</label>

              <input className='marginLeft' type="checkbox" name="blueCheck" id="blue" onChange={onChange} />
              <label>{"Blue > 50%"}</label>

              <input className='marginLeft' type="checkbox" name="saturationCheck" id="saturation" onChange={onChange} />
              <label>{"Saturation > 50%"}</label>
          </div>
        </form>
    </div>
  );
}
    
export default Header
