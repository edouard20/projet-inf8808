import { motion } from 'framer-motion';
import TextSection from './TextSection';
import './App.css'
import TitleText from './TitleText';
function AlonsoTimeline() {
    const variant = {
        visible: { scale: 1 },
        hidden: { scale: 0 },
      };
    return (
    <div>
        <div style={{textAlign: 'center', fontSize: '32px', fontFamily: 'serif'}}>
            This is the story of <b>Fernando Alonso Díaz</b><br></br>
            <br></br>The driver that has driven the most races in Formula 1 history and that is still at the top of the sport
        </div>
        <div className='timeline-box'>
            <motion.img
                src="https://i.redd.it/zzuq6zczaj871.jpg"
                style={{borderRadius: '20px', width: '30%', height: '15%'}}
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
            <div>
                <TitleText className="year" title={"2001"} color={'#4d6fcb'}/>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                        transition: {
                        duration: 3
                        }
                    }}
                    viewport={{ once: true }}>
                    <p style={{fontFamily: 'serif', fontSize: '32px', color: '#ffff'}}>Fernando Alonso's first race at the Australian Grand Prix in a Minardi PS01</p>
                </motion.div>
            </div>
        </div>
        <div className='timeline-box'>
            <div>
                <TitleText title={"2003"} color={'#75abd4'}/>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                        transition: {
                        duration: 3
                        }
                    }}
                    viewport={{ once: true }}>
                    <p style={{fontFamily: 'serif', fontSize: '32px', color: '#ffff'}}>Fernando Alonso's first win at the Hungarian Grand Prix</p>
                </motion.div>
            </div>
            <motion.img
                src="https://preview.redd.it/k3f026wfard31.jpg?auto=webp&s=bad72f0b5658edae1f375a051d227079e0811273"
                style={{borderRadius: '20px', width: '20%', height: '15%'}}
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
        </div>
        <div className='timeline-box'>
            <motion.img
                src="https://msmproduction.s3-eu-west-1.amazonaws.com/s3fs-public/2005brazil_1.jpg"
                style={{borderRadius: '20px', width: '30%', height: '15%'}}
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
            <div>
                <TitleText title={"2005"} color={'#75abd4'}/>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                        transition: {
                        duration: 3
                        }
                    }}
                    viewport={{ once: true }}>
                    <p style={{fontFamily: 'serif', fontSize: '32px', color: '#ffff'}}>Fernando Alonso wins the F1 World Championship</p>
                </motion.div>
            </div>
        </div>
        <div className='timeline-box'>
            <div>
                <TitleText title={"2006"} color={'#75abd4'}/>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                        transition: {
                        duration: 3
                        }
                    }}
                    viewport={{ once: true }}>
                    <p style={{fontFamily: 'serif', fontSize: '32px', color: '#ffff'}}>Nando wins again.</p>
                </motion.div>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                        transition: {
                        duration: 3
                        }
                    }}
                    viewport={{ once: true }}>
                    <p style={{fontFamily: 'serif', fontSize: '32px', color: '#ffff'}}>Fernando Alonso and Renault retain both Championship Titles</p>
                </motion.div>
            </div>
            <motion.img
                src="https://media.formula1.com/content/dam/fom-website/manual/d05bra1387.jpg"
                style={{borderRadius: '20px', width: '30%', height: '15%'}}
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
        </div>
        <div className='timeline-box'>
            <motion.img
                src="https://imgresizer.eurosport.com/unsafe/2560x1440/filters:format(jpeg)/origin-imgresizer.eurosport.com/2007/01/15/330800-24100760-2560-1440.jpg"
                className='img-2'
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
            <div>
                <TitleText title={"2007"} color={'#d3d4cf'}/>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                        transition: {
                        duration: 3
                        }
                    }}
                    viewport={{ once: true }}>
                    <p style={{fontFamily: 'serif', fontSize: '32px', color: '#ffff'}}>Alonso joins Mclaren to drive alongside rookie Lewis Hamilton</p>
                </motion.div>
            </div>
        </div>
        <div className='timeline-box'>
            <div>
                <TitleText title={"2008"} color={'#c14f1f'}/>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                        transition: {
                        duration: 3
                        }
                    }}
                    viewport={{ once: true }}>
                    <p style={{fontFamily: 'serif', fontSize: '32px', color: '#ffff'}}>After a tumultuous season with Mclaren, Alonso rejoins Renault</p>
                </motion.div>
            </div>
            <motion.img
                src="https://img.rasset.ie/00015759-1600.jpg"
                style={{borderRadius: '20px', width: '30%', height: '15%'}}
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
        </div>
        <div className='timeline-box'>
            <motion.img
                src="https://pbs.twimg.com/media/E7d6bdoVIAAABOE.jpg:large"
                style={{borderRadius: '20px', width: '30%', height: '15%'}}
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
            <div>
                <TitleText title={"2010"} color={'#a70000'}/>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                        transition: {
                        duration: 3
                        }
                    }}
                    viewport={{ once: true }}>
                    <p style={{fontFamily: 'serif', fontSize: '32px', color: '#ffff'}}>Fernando joins the team that all F1 drivers dream to race for, Ferrari</p>
                </motion.div>
            </div>
        </div>
        <div className='timeline-box' style={{paddingTop: '4em'}}>
            <motion.img
                src="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2016/09/07/14732440715670.jpg"
                style={{borderRadius: '20px', width: '30%', height: '15%', marginRight: '2em'}}
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
            <div>
            <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                        transition: {
                        duration: 3
                        }
                    }}
                    viewport={{ once: true }}>
                    <p style={{fontFamily: 'serif', fontSize: '32px', color: '#ffff'}}>Across this 4-year stint with Ferrari, Fernando was able to battle for the title between 2010 and 2012 but sadly missed out on the title in the final races in 2010 and 2012</p>
                </motion.div>
            </div>
        </div>
        <div className='timeline-box'>
            <div>
                <TitleText title={"2015"} color={'#d54718'}/>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                        transition: {
                        duration: 3
                        }
                    }}
                    viewport={{ once: true }}>
                    <p style={{fontFamily: 'serif', fontSize: '32px', color: '#ffff'}}>With Lewis Hamilton moving to Mercedes, Fernando decides to make a return to McLaren</p>
                </motion.div>
            </div>
            <motion.img
                src="https://i.guim.co.uk/img/media/1bc3558c5b516622e0ce4569d3b823130532c85d/645_506_4010_2406/master/4010.jpg?width=1200&quality=85&auto=format&fit=max&s=4df1514fb37c138202f8267eeee6fdbc"
                style={{borderRadius: '20px', width: '30%', height: '15%'}}
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
        </div>
        <div className='timeline-box'>
            <motion.img
                src="https://fotografias.larazon.es/clipping/cmsimages01/2022/11/13/804255EC-DAE0-4F5B-B5B7-3D2F81C99053/98.jpg?crop=4601,2589,x0,y239&width=1900&height=1069&optimize=low&format=webply"
                style={{borderRadius: '20px', width: '30%', height: '30%', marginRight: '2em'}}
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
            <div>
                <TitleText title={"2018"} color={'#fcb7d6'}/>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                        transition: {
                        duration: 3
                        }
                    }}
                    viewport={{ once: true }}>
                    <p style={{fontFamily: 'serif', fontSize: '32px', color: '#ffff'}}>After a 2-year break, the legendary driver decides to make a return to Formula 1. He joins his former Renault team, now re-branded as Alpine</p>
                </motion.div>
            </div>
        </div>
        <div className='timeline-box' style={{paddingTop: '4em'}}>
            <motion.img
                src="https://cdn.racingnews365.com/2023/Alonso/_1800x945_crop_center-center_75_none/Alonso-Aston-Martin-Australian-GP-2023.jpg?v=1680269435"
                style={{borderRadius: '20px', width: '30%', height: '15%'}}
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
            <div>
                <TitleText title={"2023-Present"} color={'#34564e'}/>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                        transition: {
                        duration: 3
                        }
                    }}
                    viewport={{ once: true }}>
                    <p style={{fontFamily: 'serif', fontSize: '32px', color: '#ffff'}}>Nando joins Aston Martin. An unexpected force with an underdog mentality</p>
                </motion.div>
                <TextSection text={""}/>
            </div>
        </div>
        <div className='description-text'>To this day, Fernando is still racing at the top level at the fine age of <span style={{color: "green"}}>42</span>. A famous statistic about Nando is that if he had scored 11 more points across his Formula 1 career, he could have been a <span style={{color: "red"}}>five</span>-time world champion.</div>
    </div>
    );
}

export default AlonsoTimeline;