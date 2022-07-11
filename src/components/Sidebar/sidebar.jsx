import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar = ({ active }) => {
  const closeSidebar = () => { active(false) }

  const username = localStorage.getItem("nameFastCloset");
  const token = localStorage.getItem("tokenFastCloset");

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    //getCartProducts()
    // eslint-disable-next-line
  }, []);

  function logout() {
    if (window.confirm("Deseja realmente fazer logout?")) {
      localStorage.setItem("tokenFastCloset", "");
      localStorage.setItem("nameFastCloset", "");
      window.location.reload();
    }
  }

  function getCartProducts() {
    const promisse = axios.get(`https://fast-closet.herokuapp.com/cart`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    promisse
      .then((res) => {
        setCart(res.data);
      })

      .catch((err) => {
        alert(err.response.data);
      })
  }

  return (
    <Container sidebar={active}>
      <Vazio onClick={closeSidebar}></Vazio>
      <Content>
        <Close onClick={closeSidebar}><ion-icon name="close-circle-outline"></ion-icon></Close>
        <Hello>
          <p>Olá, {username}.</p>
          <Login>
            <p onClick={logout}>Fazer logout</p>
          </Login>
        </Hello>
        <Options>
          <div>
            <p><ion-icon name="person-outline"></ion-icon></p>
            <p>Minha conta</p>
          </div>
          <div>
            <p><ion-icon name="bag-handle-outline"></ion-icon></p>
            <p>Meus pedidos</p>
          </div>
          <Link to='/'>
            <div>
              <p><ion-icon name="home-outline"></ion-icon></p>
              <p>Voltar para home</p>
            </div>
          </Link>
          <div>
            <p><ion-icon name="cart-outline"></ion-icon></p>
            <p onClick={() => setShowCart(!showCart)}>Carrinho</p>
          </div>
          <Cart>
            {showCart ? (
              cart.length > 0 ? (
                <Itens>
                  {cart.map((item, index) => {
                    return (
                      <p>{item}</p>
                    )
                  })}
                </Itens>
              ) : (
                <NoItens>
                  <p>Carrinho vazio</p>
                </NoItens>
              )
            ) : ""}
          </Cart>
        </Options>
      </Content>
    </Container>
  )
}

const Itens = styled.div`
  
`

const NoItens = styled.div`
  width: 200px;
  height: 30px;
`

const Cart = styled.div`
  font-size: 9px;
  margin-left: 20px;
`

const Options = styled.div`

  margin-top: 25px;

  div{
    display: flex;
    font-size: 12px;

    p{
      margin-left: 20px;
      margin-bottom: 10px;
    }
  }
`
const Login = styled.div`
  font-size: 9px;
  margin-top: 5px;
  p{
    color: #dd1d1d;
  }
`

const Hello = styled.div`
  margin: 20px;
  font-size: 15px;
`

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0px;
  right: ${props => props.sidebar ? '0' : '-100%'};
  display: flex;
  animation: showSidebar .4s;
  
  @keyframes showSidebar {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 300px;
    }
  }
`;

const Vazio = styled.div`
    height: 100vh;
    width: calc(100vw - 300px);
    position: fixed;
    left: 0;
`

const Close = styled.div`
  font-size: 40px;
  position: fixed;
  margin-top: 20px;
  margin-left: 250px;
  color: white;
  cursor: pointer;
`

const Content = styled.div`
    background-color: #344149;
    width: 300px;
    position: fixed;
    right: 0;
    height: 100vh;
    font-family: var(--roboto-font);
`

export default Sidebar
