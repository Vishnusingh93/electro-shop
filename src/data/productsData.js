


import bulb from "../assets/products/bulb.png";
import tubelight from "../assets/products/tubelight.jpg";
import switchSadha from "../assets/products/switch-sadha.jpg";
import modular6ampSwitch from "../assets/products/moduler6ampswitch.jpg";
import moduler6ampSocket from "../assets/products/moduler6ampSocket.webp"
import moduler16ampSocket from "../assets/products/moduler-16amp-socket.webp"
import veto16ampSocket from "../assets/products/veto-16amp-socket.jpg"
import socket6amp from "../assets/products/socket6amp.webp"
import veto16ampswitch from "../assets/products/veto16ampswitch.webp"
import moduler16ampswitech from "../assets/products/moduler-16amp-switch.jpg"
import sellingfan from "../assets/products/sellingfan.jpg"

export const products = [

/* BULBS */
{
  name: "Surya LED Bulb",
  category: "Bulbs",
  img: bulb,
  warranty: "1 Year Warranty",
  active: true,
  options: [
    { label: "3 Watt", price: 50, mrp: 80 },
    { label: "5 Watt", price: 60, mrp: 80 },
    { label: "7 Watt", price: 70, mrp: 120 },
    { label: "10 Watt", price: 100, mrp: 160 },
    { label: "12 Watt", price: 120, mrp: 180 },
    { label: "15 Watt", price: 150, mrp: 200 },
    { label: "23 Watt", price: 260, mrp: 300 },
    { label: "30 Watt", price: 300, mrp: 360 },
    { label: "40 Watt", price: 450, mrp: 500 },
    { label: "45 Watt", price: 550, mrp: 600 },
  ]
},

/* TUBELIGHT */
{
  name: "Surya LED Tubelight",
  category: "Bulbs",
  img: tubelight,
  warranty: "1 Year Warranty",
  active: true,
  options: [
    { label: "20 Watt", price: 200, mrp: 260 },
    { label: "36 Watt", price: 380, mrp: 420 }
  ]
},

/* SWITCHES */
{
  name: "Veto Switch",
  category: "Switches",
  active: true,
  options: [
    { label: "6A Sadha", price: 20,  mrp: 50, img: switchSadha },
    { label: "16A Sadha", price: 90, mrp: 120, img: veto16ampswitch }
  ]
},
{
  name: "Veto Modular Switch",
  category: "Switches",
  active: true,
  options: [
    { label: "6A", price: 30, mrp:60, img: modular6ampSwitch },
    { label: "16A", price: 90,mrp:120,  img: moduler16ampswitech }
  ]
},

/* SOCKETS */
{
  name: " Veto 3 Pin Socket modular",
  category: "Sockets",
  active: true,
  options: [
    { label: "6A", price: 40,  mrp:80, img: moduler6ampSocket },
    { label: "16A", price: 80, mrp:120,  img:moduler16ampSocket }
  ]
},
{
  name: "Veto Socket Sadha",
  category: "Sockets",
  active: true,
  options: [
    { label: "6A socket", price: 30, mrp:60, img:socket6amp  },
    { label: "16A socket", price: 90 , mrp:130, img: veto16ampSocket }
  ]
},

{
  name: " Veto Holder",
  category: "Accessories",
  img: "https://cms.polycab.com/media/43ri2g5l/sac0600005_img_01.png?format=webp",
  active: true, // Coming Soon
  options: [
    { label: "Angle Holder", price: 35, mrp: 60 }
  ]
},

/* ACCESSORIES */
{
  name: "Extension Board",
  category: "Accessories",
  img: "https://m.media-amazon.com/images/I/41jFTaJA5HL._SY300_SX300_QL70_FMwebp_.jpg",
  active: true, // Coming Soon
  options: [
    { label: "3 Socket", price: 150, mrp:200 },
    { label: "4 Socket", price: 150, mrp:210 },
    { label: "6 Socket", price: 150, mrp:220 }
   
  ]
},
{
  name: "Plug Top",
  category: "Accessories",
  img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTAC2TzGq-RriBhpWqXoJ9rx009L56pzgUdq3zgeh0GftwrrTXJB8BhlZAMJZ2-RUVbvA_327ORk7_HLhRH0M-vjTHUZyFTrvB3uuzqKysYP9hThd0f7w1NB9_eP7dLHWePidurzLWfcuE&usqp=CAc",
  active: true, // Coming Soon
  options: [
    { label: "2 pin", price: 10, mrp:15, img:"https://5.imimg.com/data5/SELLER/Default/2023/10/352641285/QO/MK/WU/11479756/2-pin-plug-top-500x500.jpeg" },
    { label: "6A", price: 40, mrp:80 },
    { label: "16A", price: 90, mrp: 120 }
  ]
},

/* REGULATORS */
{
  name: "Fan Regulator",
  category: "Regulators",
  img: "https://m.media-amazon.com/images/I/31DlycI3VZL._SY300_SX300_QL70_FMwebp_.jpg",
  active: true, // Coming Soon
  options: [
    { label: "sadha", price: 60, mrp: 120},
    { label: "moduler", price: 80, mrp: 150 }
  ]
},
{
  name: "40/76  Wire",
  category: "Wires",
img:"https://cpimg.tistatic.com/9293082/s/6/40-76-90-mtr-copper-flexible-polypack-wire-twin-twisted.jpg",
  active: true, // Coming Soon
  options: [
    { label: "90 mtr silver", price: 650 },
    { label: "90 mtr copper", price: 850 }
  ]
},
{
  name: "Tape Roll",
  category: "Accessories",
  img: "https://partsbaba.com/cdn/shop/files/51rQkcu-thL.jpg?v=1743597977&width=1946",
  active: true, // Coming Soon
  options: [
    { label: "Insulation Tape", price: 10 }
  ]
},


{
  name: "Philips LED Bulb",
  category: "Bulbs",
  img: bulb,
  warranty: "1 Year Warranty",
  active: false, // Coming Soon
  options: [
    { label: "7 Watt", price: 80, mrp: 110 },
    { label: "12 Watt", price: 120, mrp: 160 }
  ]
},
{
  name: "Havells LED Bulb",
  category: "Bulbs",
  img: bulb,
  warranty: "1 Year Warranty",
  active: false, // Coming Soon
  options: [
    { label: "9 Watt", price: 95, mrp: 130 },
    { label: "15 Watt", price: 140, mrp: 180 }
  ]
},





/* FANS */
{
  name: "Ceiling Fan",
  category: "Fans",
  img: sellingfan,
  active: false, // Coming Soon
  options: [
    { label: "48 Inch", mrp: 1500 },
    { label: "56 Inch", price: 1700 }
  ]
},
{
  name: "Table Fan",
  category: "Fans",
  img: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ0PjLt3OGJTCI0bpyOdDAjqdXGcUeLc8s70ZOVS9BhmyUaQNmms_5tWAlH075e-nkvx0qlZyr0_ir97tJAzwy83lJ3mdwCmQ',
  active: false, // Coming Soon
  options: [
    { label: "Standard", mrp: 1100 }
  ]
},
{
  name: "Exhaust Fan",
  category: "Fans",
  img: "https://m.media-amazon.com/images/I/31ycy16H+cL._SX300_SY300_QL70_FMwebp_.jpg",
  active: false, // Coming Soon
  options: [
    { label: "9 Inch", mrp: 900 }
  ]
},


{
  name: "Electronic Regulator",
  category: "Regulators",
  img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTr4wkv9LOyiRorc2tE9uiOxiHIMGqSDyajJXZJl37wr0Kn_rNxUuCNyzfp1L_NSmUIOxHQdMCV3v8C3dDMZxqsLbk1eKOmQC1fOVEq-XdaYeakyo_4yzFOvG1-",
  active: false, // Coming Soon
  options: [
    { label: "Premium", mrp: 400 }
  ]
},

/* WIRES */
{
  name: "Finolex Wire",
  category: "Wires",
  img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTvbEQt35wTauep9HF4vct5DQuXkSiT7WpSu4d07T7V8HUG_10Gmu1Ha-uOdJbwcnzwiVjHxZIIOz9ticdJJHjN0H3wCJN0kpgmWOh785vph6rzQn4fa5eSCg",
  active: false, // Coming Soon
  options: [
    { label: "1mm", mrp: 900 },
    { label: "1.5mm", price: 1200 }
  ]
},

{
  name: "House Wiring Cable",
  category: "Wires",
  img: "https://cpimg.tistatic.com/06467511/b/4/House-Wiring-Cable.jpg",
  active: false, // Coming Soon
  options: [
    { label: "90m Roll", mrp: 2500 }
  ]
},






];