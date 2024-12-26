import React,{useState, useEffect} from 'react'
import {bindActionCreators} from "redux"
import {Button, Nav, Collapse, Navbar, Container} from 'react-bootstrap'
import Card from '../../src/components/Card'
import Logo from '../components/partials/components/logo'
import { ScrollSpy } from 'bootstrap'
import { Link } from 'react-router-dom'
import shapes5 from "../assets/images/elilta/elilta2.png";
//uiKit
import Accordions from './uikit/accordion'
import Alerts from './uikit/alert'
import Badges from './uikit/badge'
import Breadcrumbs from './uikit/breadcrumb'
import Buttons from './uikit/button'
import ButtonGroups from './uikit/buttons-group'
import Calenders from './uikit/calender'
import Cards from './uikit/card'
import Carousels from './uikit/carousel'
import DropDowns from './uikit/dropdowns'
import ListGroups from './uikit/list-group'
import Modals from './uikit/modal'
import Navbars from './uikit/navbar'
import Navs from './uikit/nav'
import OffCanvass from './uikit/off-canvas'
import Paginations from './uikit/pagination'
import Popovers from './uikit/popovers'
import Scrollspys from './uikit/scrollspy'
import Spinnerss from './uikit/spinner'
import Toasts from './uikit/toast'
import Tooltips from './uikit/tooltip'
import Progresss from './uikit/progress'
//form
import DisabledForms from './uikit/disabled-form'
import AFormControls from './uikit/alternate-form-control'
import Sizings from './uikit/sizing'
import InputGroups from './uikit/input-group'
import FloatingLables from './uikit/floating-lable'
import AFloatingLables from './uikit/alternate-floating-lable'
import ToggleBtns from './uikit/toggle-btn'
import Validations from './uikit/validation'
import Overview from './uikit/form-overview'

// content
import Typographys from './uikit/typography'
import Images from './uikit/image'
import Figures from './uikit/figure'
import Tables from './uikit/table'

//img
import topImage from '../assets/images/dashboard/splash2.jpg'
import github from '../assets/images/brands/23.png'

//prism
import '../../node_modules/prismjs/prism';
import '../../node_modules/prismjs/themes/prism-okaidia.css'

// SliderTab
import SliderTab from '../plugins/slider-tabs'

// sidebar-offcanvas
import SidebarOffcanvas from'./uikit/sidebar-offcanvas'
// store
import {NavbarstyleAction, getDirMode, getcustomizerMode, getcustomizerprimaryMode, getcustomizerinfoMode,  SchemeDirAction, ColorCustomizerAction,  getNavbarStyleMode, getSidebarActiveMode, SidebarActiveStyleAction, getDarkMode, ModeAction,  SidebarColorAction, getSidebarColorMode, getSidebarTypeMode} from '../store/setting/setting'
import {connect} from "react-redux"

const mapStateToProps = (state) => {
    return {
        darkMode: getDarkMode(state),
        customizerMode: getcustomizerMode(state),
        cololrinfomode: getcustomizerinfoMode(state),
        colorprimarymode: getcustomizerprimaryMode(state),
        schemeDirMode: getDirMode(state),
        sidebarcolorMode: getSidebarColorMode(state),
        sidebarTypeMode: getSidebarTypeMode(state),
        sidebaractivestyleMode: getSidebarActiveMode(state),
        navbarstylemode: getNavbarStyleMode(state),
    };
}
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            ModeAction,
            SchemeDirAction,
            SidebarColorAction,
            SidebarActiveStyleAction,
            NavbarstyleAction,
            ColorCustomizerAction,
        },
        dispatch
    )
})
const Index = (props) => {
     //   darkmode
     const colorMode = sessionStorage.getItem('color-mode');
     if(colorMode===null){
         props.ModeAction(props.darkMode);
     }
     else{
         props.ModeAction(colorMode);
     }
     // colocustomizermode
     const colorcustomizerMode = sessionStorage.getItem('color-customizer-mode');
     const colorcustomizerinfoMode = sessionStorage.getItem('colorcustominfo-mode');
     const colorcustomizerprimaryMode = sessionStorage.getItem('colorcustomprimary-mode');
     if(colorcustomizerMode===null){
         props.ColorCustomizerAction(props.customizerMode, props.cololrinfomode, props.colorprimarymode);
         document.documentElement.style.setProperty('--bs-info', props.cololrinfomode );
     }
     else{
         props.ColorCustomizerAction(colorcustomizerMode, colorcustomizerinfoMode, colorcustomizerprimaryMode);
         document.documentElement.style.setProperty('--bs-info', colorcustomizerinfoMode);
     }

     // rtlmode
     const rtlMode = sessionStorage.getItem('rtl-mode');
     if(rtlMode===null){
         props.SchemeDirAction(props.schemeDirMode)
     }
     else{
         props.SchemeDirAction(rtlMode);
     }   
     
    // collapse
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            Array.from(document.querySelectorAll('[data-toggle="slider-tab"]'), (elem) => {
                return new SliderTab(elem)
             })
        }, 100);
        new ScrollSpy(document.body, {
            target: '#components-collapse'
          });
         new ScrollSpy(document.body, {
            target: '#forms-collapse'
         });
         new ScrollSpy(document.body, {
            target: '#contents-collapse'
         })
    })
    
    return (
        <>
         <span className="uisheet screen-darken"></span>
            <div className="header" style= {{background:`url(${topImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh", position: "relative",}}>
                <div className="main-img">
                    <div className="container">
                    <img 
                    src={shapes5}
                    className="img-fluid rounded-circle mx-auto"
                    alt="user"
                    style={{ height: "160px", minWidth: "15px", minHight: "15px", width: "170px", }}
                      />
               
                        <h1 className="text-black my-4">
                            <span>Elilta Trading SC </span>
                        </h1>
                        <h4 className="text-black mb-5">Customers are always Right </h4>
                        <div className="d-flex justify-content-center align-items-center">
                            <div>
                                <Link className="btn btn-light bg-blue" to="auth/sign-in" target="_black">
                                    <svg width="22" height="22" className="me-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                    </svg>
                                     Manage Everything 
                                </Link>
                            </div>
                          
                        </div>
                    </div>
                    
                </div>
        
            </div>
           
       
      
        
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
