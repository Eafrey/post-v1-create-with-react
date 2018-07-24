import React, {PureComponent, Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends  PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      allCost: 0,
      showOrder: false,
      order: [],
      isShoppingCart: false,
      shoppingCartInfo: [],
      allGoodInfo: [{
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00,
        promotion: "满100-10",
        count: 0
      },
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00,
        promotion: "满100-10",
        count: 0
      },
      {
        barcode: 'ITEM000002',
        name: '苹果',
        unit: '斤',
        price: 5.50,
        promotion: "满100-10",
        count: 0
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00,
        promotion: "满100-10",
        count: 0
      },
      {
        barcode: 'ITEM000004',
        name: '电池',
        unit: '个',
        price: 2.00,
        promotion: "满100-10",
        count: 0
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50,
        promotion: "满100-10",
        count: 0
      }],
    }
  }

  onGoShoppingCart = () => {
    let is = true;
    this.setState({
      isShoppingCart: is
    });
  }

  addShoppingCart = (index, count) => {
    let info = this.state.allGoodInfo[index];
    // console.log("index", index);
    // console.log("info", info);
    info["count"] = count;

    let ac = this.state.allCost;
    ac += count * info.price;
    this.setState({
      allCost : ac
    });

    this.state.shoppingCartInfo.push(info);
    // console.log("this.state.shoppingCartInfo", this.state.shoppingCartInfo);
  }

  submitOrder = () => {
    let order = [];
    this.state.shoppingCartInfo.forEach(element => {
      let str = "";
      if (element.count > 1) {
        str = element.barcode + '-' + element.count;
      } else {
        str = element.barcode;
      }
      order.push(str);
    });

    this.setState({
      order: order,
      showOrder: true
    });

    // console.log("order", this.state.order);
  }

  render() {
    if (this.state.showOrder) {
      return <div className="App">
        {this.state.order.map((item) => {
          return <p>{item}</p>
        })}
      </div>
    }
    if (this.state.isShoppingCart) {
      return (
        <div className="App">
          <div>
            <table className="App-intro">
              <td>商品名称</td>
              <td>单价（元）</td>
              <td>单位</td>
              <td>优惠活动</td>
              <td>购买个数</td>
              <td>小计(元）</td>

              <tbody>
                {this.state.allGoodInfo.map((item, index) => {
                  return <tr>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.unit}</td>
                    <td>{item.promotion}</td>
                    <td>{item.count}</td>
                    <td>{item.count * item.price}</td>
                  </tr>
                })}

                <tr>
                <td>合计（元）</td>
                    <td>{this.state.allCost}</td>
                 </tr>

              </tbody>
            </table>

                <button onClick={this.submitOrder}>提交订单</button>
          </div>

        </div>);
    
    } else {
      return (
        <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
              </header>
              <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
        </p>

              <table className="App-intro">
                <td>商品名称</td>
                <td>单价（元）</td>
                <td>单位</td>
                <td>优惠活动</td>
                <td>购买个数</td>

                <tbody>

                  {this.state.allGoodInfo.map((item, index) => {
                    return <GoodItem item={item} index={index} addShoppingCart={this.addShoppingCart} />
                  })}

                  <tr>
                    <button onClick={this.onGoShoppingCart}>购物车</button>
                  </tr>

                </tbody>



              </table>


            </div>

            );
          }
        }
      }
      
class GoodItem extends Component {
              constructor(props) {
            super(props);
          }
        
  addShoppingCart = (index) => {
    if(!new RegExp(/\d+/).test(this.refs.count.value)) {
              alert("请输入正确的个数")
      return
            }
            let originalCount = parseInt(this.props.item.count);
            let count = parseInt(this.refs.count.value);
            this.props.addShoppingCart(this.props.index, count+originalCount);
          }
        
  render() {
    return (<tr>
              <td>{this.props.item.name}</td>
              <td>{this.props.item.price}</td>
              <td>{this.props.item.unit}</td>
              <td>{this.props.item.promotion}</td>
              <input ref="count" type="text" />
              <button onClick={this.addShoppingCart}>加入购物车</button>
            </tr>);
          }
        }
        
        export default App;
