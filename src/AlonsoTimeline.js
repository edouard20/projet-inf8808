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
        <TextSection text={"This is the story of Fernando Alonso Díaz"}></TextSection>
        <div className='timeline-box'>
            <motion.img
                src="https://i.redd.it/zzuq6zczaj871.jpg"
                className='img'
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
            <div>
                <TitleText title={"2001"}/>
                <TextSection text={"Fernando Alonso's first race at the 2001 Australian Grand Prix in a Minardi PS01"}/>
            </div>
        </div>
        <div className='timeline-box'>
            <motion.img
                src="https://preview.redd.it/k3f026wfard31.jpg?auto=webp&s=bad72f0b5658edae1f375a051d227079e0811273"
                className='img'
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
            <div>
                <TitleText title={"2003"}/>
                <TextSection text={"Fernando Alonso's first win at the 2003 Hungarian Grand Prix"}/>
            </div>
        </div>
        <div className='timeline-box'>
            <motion.img
                src="https://msmproduction.s3-eu-west-1.amazonaws.com/s3fs-public/2005brazil_1.jpg"
                className='img'
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
            <div>
                <TitleText title={"2005"}/>
                <TextSection text={"Fernando Alonso wins the 2005 F1 World Championship"}/>
            </div>
        </div>
        <div className='timeline-box'>
            <motion.img
                src="https://media.formula1.com/content/dam/fom-website/manual/d05bra1387.jpg"
                className='img'
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
            <div>
                <TitleText title={"2006"}/>
                <TextSection text={"Nando wins again."}/>
                <TextSection text={"Fernando Alonso and Renault retain both Championship Titles"}/>
            </div>
        </div>
        <div className='timeline-box'>
            <motion.img
                src="https://imgresizer.eurosport.com/unsafe/2560x1440/filters:format(jpeg)/origin-imgresizer.eurosport.com/2007/01/15/330800-24100760-2560-1440.jpg"
                className='img'
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
            <div>
                <TitleText title={"2007"}/>
                <TextSection text={"Fernando Alonso joins Mclaren to drive alongside rookie Lewis Hamilton"}/>
            </div>
        </div>
        <div className='timeline-box'>
            <motion.img
                src="https://img.rasset.ie/00015759-1600.jpg"
                className='img'
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
            <div>
                <TitleText title={"2008"}/>
                <TextSection text={"After one season with Mclaren, Alonso rejoins Renault"}/>
            </div>
        </div>
        <div className='timeline-box'>
            <motion.img
                src="https://pbs.twimg.com/media/E7d6bdoVIAAABOE.jpg:large"
                className='img'
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
            <div>
                <TitleText title={"2010"}/>
                <TextSection text={"Fernando joins the team that all F1 drivers dream to race for, Ferrari"}/>
            </div>
        </div>
        <div className='timeline-box'>
            <motion.img
                src="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2016/09/07/14732440715670.jpg"
                className='img'
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
            <div>
                <TitleText title={"2010"}/>
                <TextSection text={"Across this 4-year stint with Ferrari, Fernando was able to battle for the title between 2010 and 2012 but sadly missed out on the title in the final races in 2010 and 2012"}/>
            </div>
        </div>
        <div className='timeline-box'>
            <motion.img
                src="https://i.guim.co.uk/img/media/1bc3558c5b516622e0ce4569d3b823130532c85d/645_506_4010_2406/master/4010.jpg?width=1200&quality=85&auto=format&fit=max&s=4df1514fb37c138202f8267eeee6fdbc"
                className='img'
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
            <div>
                <TitleText title={"2015"}/>
                <TextSection text={"With Lewis Hamilton moving to Mercedes, Fernando decides to make a return to McLaren"}/>
            </div>
        </div>
        <div className='timeline-box'>
            <motion.img
                src="https://fotografias.larazon.es/clipping/cmsimages01/2022/11/13/804255EC-DAE0-4F5B-B5B7-3D2F81C99053/98.jpg?crop=4601,2589,x0,y239&width=1900&height=1069&optimize=low&format=webply"
                className='img'
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
            <div>
                <TitleText title={"2018"}/>
                <TextSection text={"After a 2-year break, the legendary driver decides to make a return to Formula 1. He joins his former Renault team, now re-branded as Alpine"}/>
            </div>
        </div>
        <div className='timeline-box'>
            <motion.img
                src="https://cdn.racingnews365.com/2023/Alonso/_1800x945_crop_center-center_75_none/Alonso-Aston-Martin-Australian-GP-2023.jpg?v=1680269435"
                className='img'
                variants={variant}
                initial="hidden"
                whileInView="visible">
            </motion.img>
            <div>
                <TitleText title={"2023-Present"}/>
                <TextSection text={"Fernando joins the Aston Martin challenge. An unexpected force with an underdog mentality"}/>
            </div>
        </div>
        <TextSection text={"Fernando is still racing at the top level at the fine age of 42. A famous statistic about Nando is that if he had scored 11 more points across his Formula 1 career, he could have been a five-time world champion."}></TextSection>
    </div>
    );
}

export default AlonsoTimeline;