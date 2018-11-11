import React from 'react';
import { Link } from 'react-router-dom';

import '../js/main.js';
if(window.location.href == 'https://conectatupaisco.herokuapp.com/' || window.location.href == 'http://localhost:8080/' || window.location.href == 'http://localhost:3000/'){
  import '../client/styles/components/Home/_base.css';
  import '../client/styles/components/Home/_main.css';
}


export default class Home extends React.Component{
  render(){
    return (
      <div id='top'>
          <div className="parallax-mirror" style={{visibility: 'visible', position: 'fixed', top: '-22px', left: '0px', overflow: 'hidden', transform: 'translate3d(0px, 0px, 0px)', height: window.innerHeight, width: window.innerWidth}}>
            <img className="parallax-slider" src="https://www.bbva.com/wp-content/uploads/en/2016/04/bienvenida-a-colombia-rodero.jpg" style={{transform: 'translate3d(0px, 0px, 0px)', position: 'absolute', top: '22.2px', left: '0px', height: window.innerHeight, width: window.innerWidth, maxWidth: 'none'}}/>
          </div>
          <header className="s-header">
            <div className="header-logo">
                <Link className={'site-logo'} to={{ pathname: '/' }} >
                  <img src="https://ejemplos.impaktu.com/sites/default/file/conectatupaisLogo_v2.png" alt="Homepage"/>
                </Link>
            </div>
          </header>
            <section id="home" className="s-home target-section" data-parallax="scroll" data-image-src="images/hero-bg.jpg" data-natural-width='3000' data-natural-height='2000' data-position-y='center'>

                <div className="overlay"></div>
                <div className="shadow-overlay"></div>

                <div className="home-content">

                    <div className="row home-content__main">

                        <h3>bienvenido a conectatupaís</h3>
                        <div style={{height:'150px', width: '4px',position: 'absolute',marginTop: '13px',marginLeft: '-10px',backgroundColor:'#fbd115'}}></div>
                        <h1>Conoce de manera sencilla</h1>
                        <h1>los sistemas de información</h1>
                        <div style={{height:'55px', width: '4px',position: 'absolute',marginTop: '13px',marginLeft: '-10px',backgroundColor:'#0984e6'}}></div>
                        <h1>de los Ministerios de Colombia</h1>
                        <div style={{height:'65px', width: '4px',position: 'absolute',marginTop: '13px',marginLeft: '-10px',backgroundColor:'#ce1025'}}></div>
                        <h1>para realizar diferentes procesos.</h1>

                        <div className="home-content__buttons">
                          {/* <Link className={'smoothscroll btn btn--stroke'} to={{ pathname: '/principal/mapa' }} >
                            Buscar Ahora
                          </Link> */}
                          <a href="/principal/mapa" className="smoothscroll btn btn--stroke">
                              Buscar Ahora
                          </a>
                          <a href="#about" className="smoothscroll btn btn--stroke">
                              Sobre Nosotros
                          </a>
                        </div>

                    </div>

                    <div className="home-content__scroll">
                        <a href="#about" className="scroll-link smoothscroll">
                            <span>Desplazarse hacia abajo</span>
                        </a>
                    </div>

                    <div className="home-content__line"></div>

                </div>


                <ul className="home-social">
                    <li>
                        <a href="#0" style={{color:'#fbd115'}}><i className="fa fa-facebook" aria-hidden="true" ></i><span>Facebook</span></a>
                    </li>
                    <li>
                        <a href="#0" style={{color:'#0984e6'}}><i className="fa fa-twitter" aria-hidden="true" ></i><span>Twiiter</span></a>
                    </li>
                    <li>
                        <a href="#0" style={{color:'#ce1025'}} ><i className="fa fa-instagram" aria-hidden="true" ></i><span>Instagram</span></a>
                    </li>
                </ul>
            </section>
            <section id='about' className="s-about">

                <div className="row section-header has-bottom-sep" data-aos="fade-up">
                    <div className="col-full">
                        <h3 className="subhead subhead--dark">Hola Colombia</h3>
                        <h1 className="display-1 display-1--light">¿Quiénes somos?</h1>
                    </div>
                </div>

                <div className="row about-desc" data-aos="fade-up">
                    <div className="col-full">
                        <p style={{color:'#FFFF'}}>
                        Somos un grupo de estudiantes de ingeniería de la Universidad Piloto de Colombia, quienes junto al profesor Luis Felipe Herrera ideamos este servicio como una forma de aportar valor al país y mejorar la manera en la que los ciudadanos colombianos pueden realizar sus trámites.
                        </p>
                    </div>
                </div>
                <div className="about__line"></div>

            </section>
            <section id='services' className="s-services">

                <div className="row section-header has-bottom-sep" data-aos="fade-up">
                    <div className="col-full">
                        <h2 className="subhead">¿Qué es Conecta Tu País?</h2>
                        <h1 className="display-2">“Un servicio para servicios”</h1>
                    </div>
                </div>

                <div className="row services-list block-1-2 block-tab-full">
                    <div className="col-block service-item" data-aos="fade-up">
                        <div className="service-text">
                            <h3 className="h2">Centralizar la información en un único repositorio virtual</h3>
                            <p style={{textAlign: 'justify'}}>Conecta Tu País es un servicio web y aplicación móvil que le permitirá a los colombianos realizar consultas y búsquedas de todos los servicios que ofrecen cada uno de los Ministerios que conforman la rama ejecutiva del Gobierno Nacional. Al encontrar los servicios deseados, podrán ver los requisitos para obtenerlos y las ubicaciones a las cuales deben acudir para hacerlos efectivos y al final obtener el resultado o la salida deseada.
                            </p>
                        </div>
                    </div>

                    <div className="col-block service-item" data-aos="fade-up">
                        <div className="service-text">
                            <h3 className="h2">Presentar la información de forma intuitiva y amigable para el uso del ciudadano</h3>
                            <p style={{textAlign: 'justify'}}>De esta forma eliminamos la presencialidad y mitigamos la tramitología presente en la forma de adquirir servicios del Gobierno Nacional hoy en día.
                            </p>
                        </div>
                    </div>
                </div>

            </section>
            <section id='works' className="s-works">
                <div className="intro-wrap">

                    <div className="row section-header has-bottom-sep light-sep" data-aos="fade-up">
                        <div className="col-full">
                          <h1 className="display-2 display-2--light">Por un país conectado</h1>

                        </div>
                    </div>
                    <div className="row works-content">
                      <div className="col-full">
                        <h3 className="subhead">Misión</h3>
                        <h4 style={{color:'#FFFF',textAlign:'justify'}}>
                          Ofrecer valor a los ciudadanos colombianos a través de un servicio tecnológico que apoye y simplifique la forma en la cual puede acceder a la información de los servicios y trámites que ofrecen cada una de las entidades gubernamentales de la rama ejecutiva.
                        </h4>
                      </div>
                      <div className="col-full">
                        <h3 className="subhead">Visión</h3>
                        <h4 style={{color:'#FFFF',textAlign:'justify'}}>
                          •	Establecer un lineamiento institucional y trasversal a todas las entidades gubernamentales de la rama ejecutiva que permita alimentar constantemente la información almacenada en la aplicación, con el fin de plasmar en nuestro servicio información verídica y actualizada
                        </h4>
                        <h4 style={{color:'#FFFF',textAlign:'justify'}}>
                          •	Alcanzar a toda la población del territorio colombiano que tenga acceso a internet desde equipos de cómputo o dispositivos móviles.
                        </h4>
                      </div>
                    </div>

                </div>
            </section>
            {/* <section id="clients" className="s-clients">

                <div className="row section-header" data-aos="fade-up">
                    <div className="col-full">
                        <h3 className="subhead">Nuestro Equipo</h3>
                        <h1 className="display-2">Nos gusta lo que hacemos, conoce nuestro equipo.</h1>
                    </div>
                </div>

                <div className="row clients-testimonials" data-aos="fade-up">
                    <div className="col-full">
                        <div className="testimonials">

                            <div className="testimonials__slide">

                                <p>Qui ipsam temporibus quisquam vel. Maiores eos cumque distinctio nam accusantium ipsum.
                                Laudantium quia consequatur molestias delectus culpa facere hic dolores aperiam. Accusantium quos qui praesentium corpori.
                                Excepturi nam cupiditate culpa doloremque deleniti repellat.</p>

                                <img src="images/avatars/user-01.jpg" alt="Author image" className="testimonials__avatar"/>
                                <div className="testimonials__info">
                                    <span className="testimonials__name">Tim Cook</span>
                                    <span className="testimonials__pos">CEO, Apple</span>
                                </div>

                            </div>

                            <div className="testimonials__slide">

                                <p>Excepturi nam cupiditate culpa doloremque deleniti repellat. Veniam quos repellat voluptas animi adipisci.
                                Nisi eaque consequatur. Quasi voluptas eius distinctio. Atque eos maxime. Qui ipsam temporibus quisquam vel.</p>

                                <img src="images/avatars/user-05.jpg" alt="Author image" className="testimonials__avatar"/>
                                <div className="testimonials__info">
                                    <span className="testimonials__name">Sundar Pichai</span>
                                    <span className="testimonials__pos">CEO, Google</span>
                                </div>

                            </div>

                            <div className="testimonials__slide">

                                <p>Repellat dignissimos libero. Qui sed at corrupti expedita voluptas odit. Nihil ea quia nesciunt. Ducimus aut sed ipsam.
                                Autem eaque officia cum exercitationem sunt voluptatum accusamus. Quasi voluptas eius distinctio.</p>

                                <img src="images/avatars/user-02.jpg" alt="Author image" className="testimonials__avatar"/>
                                <div className="testimonials__info">
                                    <span className="testimonials__name">Satya Nadella</span>
                                    <span className="testimonials__pos">CEO, Microsoft</span>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

            </section> */}
            <footer style={{backgroundColor:'#111111','marginLeft':'0px'}}>
                <div className="row footer-bottom">
                    <div className="col-twelve">
                        <div className="copyright">
                            <span>© Copyright ConectaTuPais</span>
                            <span>Site Template by <a href="https://www.colorlib.com/">Colorlib</a></span>
                        </div>

                        <div className="go-top">
                            <a className="smoothscroll" title="Back to Top" href="#top"><i className="icon-arrow-up" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
      </div>
    );
  }
}
