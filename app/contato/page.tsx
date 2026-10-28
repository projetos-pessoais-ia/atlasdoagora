import Link from 'next/link';
import {Header,Footer} from '../components';
import {pageMetadata} from '../seo';
import {contactEmail} from '../contact-details';
import '../institutional.css';

export const metadata=pageMetadata({path:'/contato/',title:'Contato — Atlas do Agora',description:'Converse com o Atlas do Agora: sugestões de pauta, correções, dúvidas e solicitações sobre privacidade.'});

export default function Contact(){return <div id="top"><Header/><main className="shell institutional-page">
  <div className="breadcrumbs"><Link href="/">Início</Link><span>/</span><span>Contato</span></div>
  {!contactEmail&&<aside className="institutional-draft"><strong>Página em preparação</strong><p>O canal oficial de contato ainda está sendo definido. Esta versão está disponível para revisão.</p></aside>}
  <header className="institutional-heading"><div className="section-kicker">VAMOS CONVERSAR</div><h1>Uma boa história também começa com uma conversa.</h1><p>Tem uma pergunta, encontrou algo que precisa de correção ou quer sugerir uma pauta? Este é o espaço para falar com o Atlas do Agora.</p></header>
  <section className="contact-channel" aria-labelledby="contact-channel-title"><h2 id="contact-channel-title">Fale com o Atlas</h2>{contactEmail?<><p>Envie sua mensagem para:</p><a className="contact-address" href={`mailto:${contactEmail}`}>{contactEmail}</a><p>Indique o assunto no título do e-mail para facilitar o atendimento.</p></>:<p>O endereço de e-mail será divulgado aqui assim que o canal estiver disponível.</p>}</section>
  <div className="contact-topics"><article><span>01 / PAUTAS E IDEIAS</span><h2>O que você quer entender?</h2><p>Sugira temas, perguntas e bases de dados que podem render novas histórias sobre o Brasil.</p></article><article><span>02 / CORREÇÕES</span><h2>Ajude a melhorar uma matéria.</h2><p>Informe o link da publicação, o trecho ou número a revisar e, se possível, a fonte que ajuda a conferir a informação.</p></article><article><span>03 / PRIVACIDADE</span><h2>Seus dados, suas dúvidas.</h2><p>Use o mesmo canal para perguntar sobre o tratamento de dados ou solicitar o exercício de seus direitos.</p></article></div>
  <div className="institutional-copy"><section><h2>Envie apenas o necessário</h2><p>Para uma sugestão ou correção, bastam a descrição do assunto e os links relevantes. Evite enviar senhas, documentos de identificação ou dados sensíveis sem necessidade.</p><p>O contato será feito por e-mail. Esta página não possui formulário de envio nem recebe mensagens diretamente pelo site.</p></section></div>
  <p className="institutional-crosslink">Saiba como tratamos informações de navegação e contato na <Link href="/politica-de-privacidade/">Política de Privacidade</Link>.</p>
</main><Footer/></div>}
