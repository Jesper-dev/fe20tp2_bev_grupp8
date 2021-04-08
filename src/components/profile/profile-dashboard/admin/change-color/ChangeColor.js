import React, { useState, useContext, useEffect } from 'react';
import { HslColorPicker } from 'react-colorful';

import { FirebaseContext } from '../../../../firebase';
import { Wrapper } from './ChangeColorElements';

const ChangeColor = () => {
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));

    const [primaryColor, setPrimaryColor] = useState({ h: 0, s: 0, l: 32 });

    useEffect(() => {
        getColor();
    }, []);

    const getColor = () => {
        firebase
            .organization(user.organization)
            .child('/colors')
            .on('value', (snapshot) => {
                const data = snapshot.val();
				setPrimaryColor(data.primaryColor);
            });
    };

    const updateColor = primaryColor => {
		firebase
			.organization(user.organization)
			.child('/colors/primaryColor')
			.update({
				h: primaryColor.h,
				s: primaryColor.s,
				l: primaryColor.l
			});

		setPrimaryColor(primaryColor);
		console.log(primaryColor);
    };

	// TODO: Explore "react-colorful" features, update "color-preview" live

    return (
        <Wrapper>
			<HslColorPicker color={primaryColor} onChange={setPrimaryColor} />
			<div className="container">
				<div className="color-preview" style={{ backgroundColor: primaryColor }}></div>
            	<button onClick={() => updateColor(primaryColor)}>Confirm</button>
			</div>
        </Wrapper>
    );
};

export default ChangeColor;

// import React, { useState, useContext, useEffect } from 'react';
// import { HexColorPicker } from 'react-colorful';
// import { FirebaseContext } from '../../../../firebase';

// import { GenericVestBtn } from '../../../../shared/button/ButtonElements';
// import { Wrapper } from './ChangeColorElements';

// const ChangeColor = () => {
//     const [color, setColor] = useState('#aabbcc');
//     const [prewOne, setPrewOne] = useState('');
//     const [prewTwo, setPrewTwo] = useState('');
//     const [prewThree, setPrewThree] = useState('');
//     const firebase = useContext(FirebaseContext);
//     const user = JSON.parse(localStorage.getItem('authUser'));
//     const [colorList, setColorList] = useState([]);

//     useEffect(() => {
//         getColors();
//     }, []);

//     const getColors = () => {
//         firebase
//             .organization(user.organization)
//             .child('/colors')
//             .on('value', (snapshot) => {
//                 const data = snapshot.val();
//                 let colors = [];
//                 for (const key in data) {
//                     const obj = {
//                         name: key,
//                         color: data[key].value,
//                     };
//                     colors.push(obj);
//                 }

//                 console.log(colors);
//                 // setColorList(colors);
//                 // setColor(colors);
//                 setPrewOne(colors[0].color);
//                 setPrewTwo(colors[1].color);
//                 setPrewThree(colors[2].color);
//             });
//     };

//     const changeColor = (color, value) => {
//         if (value == 'one') {
//             setPrewOne(color);
//             firebase
//                 .organization(user.organization)
//                 .child('/colors/colorOne')
//                 .update({
//                     value: color,
//                 });
//         } else if (value == 'two') {
//             setPrewTwo(color);
//             firebase
//                 .organization(user.organization)
//                 .child('/colors/colorTwo/')
//                 .update({
//                     value: color,
//                 });
//         } else if (value == 'three') {
//             setPrewThree(color);
//             firebase
//                 .organization(user.organization)
//                 .child('/colors/colorThree/')
//                 .update({
//                     value: color,
//                 });
//         }
//     };
//     return (
//         <Wrapper>
//             <HexColorPicker color={color} onChange={setColor} />
//             <div className="buttonWrapper">
//                 <GenericVestBtn
//                     onClick={() => changeColor(color, 'one')}
//                     pad="8px"
//                     border="2px solid var(--primary)"
//                     br="10px"
//                     bg="none"
//                     co="var(--primary)"
//                 >
//                     Submit Color One
//                 </GenericVestBtn>
//                 <GenericVestBtn
//                     onClick={() => changeColor(color, 'two')}
//                     pad="8px"
//                     border="2px solid var(--primary)"
//                     br="10px"
//                     bg="none"
//                     co="var(--primary)"
//                 >
//                     Submit Color two
//                 </GenericVestBtn>
//                 <GenericVestBtn
//                     onClick={() => changeColor(color, 'three')}
//                     pad="8px"
//                     border="2px solid var(--primary)"
//                     br="10px"
//                     bg="none"
//                     co="var(--primary)"
//                 >
//                     Submit Color three
//                 </GenericVestBtn>
//             </div>
//             <div className="prewDiv">
//                 <div style={{ backgroundColor: prewOne }}></div>
//                 <div style={{ backgroundColor: prewTwo }}></div>
//                 <div style={{ backgroundColor: prewThree }}></div>
//             </div>
//         </Wrapper>
//     );
// };

// export default ChangeColor;