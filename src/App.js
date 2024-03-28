import React from 'react';
import { motion, useScroll } from "framer-motion";
import './App.css';
function App() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div className='progress-bar' style={{ scaleX: scrollYProgress }} />
      <code style={{color: "white"}} >useScroll</code>
      <div className="App">
        <h1 className='App-header' style={{color: "white"}}>Speed Through Time: The Evolution of Formula 1</h1>

      </div>
      <h1 style={{color: "white"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id pharetra sem, sit amet fermentum dui. Ut tincidunt elit a sapien feugiat pretium. Etiam at odio ullamcorper, faucibus sem sit amet, porttitor metus. Ut ut libero a dolor tempus vehicula. Donec fringilla elementum elit. Fusce gravida felis mattis augue maximus, vel vulputate felis imperdiet. Nullam ullamcorper pretium dolor, facilisis pretium ex sodales eleifend. Nullam semper augue sit amet dui congue, a suscipit purus rhoncus. In quis porta metus.

Nulla orci magna, facilisis eget fringilla vel, elementum quis nulla. Donec vel elementum augue, eget porta ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. In aliquet vitae nisi sed tincidunt. Suspendisse pellentesque facilisis posuere. Maecenas ullamcorper consequat mi blandit lacinia. Duis iaculis sem urna, ac consequat odio fermentum at.

Maecenas in eros et risus condimentum consequat et vel turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed vitae enim erat. Nullam aliquam leo odio, eu fermentum mauris placerat non. Nullam ut sagittis nulla. Quisque lorem ex, maximus tempus tristique et, vulputate in nisi. Etiam accumsan nisl erat, eget pretium libero iaculis ac. Vestibulum a mauris lacus. In id dignissim nisl, a pharetra ex. Nunc auctor eget augue at pharetra. Pellentesque ac viverra purus.

In sodales tempor aliquet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed id convallis erat, vel sagittis velit. Etiam rutrum mattis turpis vel commodo. In ac mauris et ex consequat viverra ut ut eros. Nunc ac tellus sed tellus feugiat dictum. Morbi in urna maximus, efficitur ante quis, vulputate odio. Vivamus et diam dui. Nullam ac ipsum suscipit, gravida odio at, eleifend urna.

Nunc elementum porta justo vel dictum. Vivamus porttitor vehicula neque eu blandit. Morbi porta elementum tortor, ut maximus turpis lobortis et. Nulla iaculis dui sit amet dui condimentum, sed interdum tortor cursus. Nullam a turpis porta, imperdiet lacus blandit, lacinia tortor. Vestibulum a elementum tellus. Proin in mattis mauris, a ullamcorper massa. In lobortis elementum tortor non iaculis.

Ut ac libero sed enim facilisis sodales. Nunc leo libero, vehicula ac leo ac, blandit malesuada nisi. Aenean dolor augue, dapibus a luctus non, rhoncus id magna. Curabitur imperdiet scelerisque commodo. Donec vulputate massa sit amet orci volutpat posuere. Suspendisse at consectetur diam. Curabitur vehicula at augue vel convallis. Praesent tortor turpis, volutpat a accumsan vitae, faucibus non sapien. Aliquam nunc quam, consequat at imperdiet vitae, ullamcorper nec erat. Morbi sollicitudin lectus a diam fermentum, at blandit dui imperdiet. Ut nec consequat ex. Pellentesque dictum urna a nisi pellentesque, ut eleifend mauris aliquet. Etiam condimentum faucibus ultricies.

In hac habitasse platea dictumst. Vivamus vulputate quam eget consequat cursus. Suspendisse potenti. Nunc hendrerit dui nec malesuada tristique. Nullam a est ut purus aliquam volutpat. In porta risus velit, sit amet pretium libero malesuada eget. Nullam a purus odio. Morbi posuere pellentesque pretium. Praesent sed turpis in nibh consectetur rhoncus. In efficitur magna fermentum mi dapibus, pharetra porttitor turpis ornare.

Cras eget pulvinar erat, vitae molestie ante. Nullam a ligula eget magna pretium dapibus. Integer sed mollis turpis. Pellentesque blandit ex in dolor hendrerit laoreet. Suspendisse potenti. Mauris purus augue, euismod in risus sed, elementum pretium sem. Maecenas diam justo, tristique at dui in, vestibulum tempor est. Aliquam erat volutpat. Nam porta pulvinar porttitor. Vivamus gravida pellentesque elit, non cursus nibh auctor non. Proin maximus molestie metus. Quisque fringilla maximus enim at faucibus. Pellentesque malesuada metus nec odio interdum imperdiet. Maecenas at dui ex. Integer dapibus scelerisque fringilla.

Suspendisse vel efficitur elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a libero eget nunc lacinia elementum. Integer nec quam pulvinar, iaculis lacus porta, tristique purus. Integer in turpis eget dolor auctor interdum. Nullam mi turpis, bibendum eu erat in, euismod finibus velit. Integer mattis ut dolor a luctus. Phasellus quis ex felis. Proin accumsan scelerisque tempor. Nullam pretium mollis velit in aliquet. Curabitur ultrices risus odio, id mollis ligula viverra id. Integer vulputate dui et egestas egestas. Donec imperdiet pretium tempor. Quisque elementum enim justo, a semper ipsum suscipit sed. Suspendisse non ullamcorper libero.

Vivamus vehicula mi eget tristique dictum. Nulla vulputate condimentum felis vehicula condimentum. Pellentesque ante augue, molestie at sodales in, lobortis eget nunc. In mauris nulla, ultrices nec ipsum ut, placerat scelerisque augue. Morbi vel mollis leo. Duis porttitor fringilla lacus, vitae vulputate ipsum volutpat sit amet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin sit amet pharetra ante, id lacinia libero. Sed rutrum nisi non laoreet scelerisque. Ut mattis eros iaculis nisl pellentesque, blandit tempor lectus volutpat.

Donec ac maximus neque. Donec ac diam eu ligula dictum consequat. Duis posuere vitae felis sed dapibus. Morbi consectetur est quis sagittis pellentesque. Sed lacinia eleifend ultricies. Aenean purus lacus, feugiat id tortor a, hendrerit aliquet eros. Nam pellentesque risus ut felis vehicula ullamcorper. Maecenas egestas vitae neque a fermentum. In suscipit pretium velit, mattis consectetur nulla luctus ac. Mauris sed quam libero.

Nulla sed erat id massa fringilla eleifend a vel nulla. Donec ante eros, interdum quis auctor ornare, hendrerit sed urna. Duis vestibulum augue enim, eget facilisis turpis commodo ac. Donec auctor iaculis eros, scelerisque vulputate sem commodo a. Pellentesque rutrum dolor ipsum, ut placerat diam egestas a. Nunc iaculis at ante vulputate lacinia. Duis vel molestie magna.

Sed auctor sem ornare, tempor leo nec, dapibus nisl. Curabitur pretium velit sed augue sollicitudin cursus at eget risus. Nam mauris tortor, dapibus ac lectus sed, porttitor vulputate eros. Nulla vel erat ut diam convallis finibus et at felis. Vivamus vehicula lacus sed venenatis gravida. Vivamus porta tellus ac dolor rhoncus, non ultricies lorem porttitor. Nulla id ultricies diam.

Cras ut elit sapien. Vestibulum quis iaculis sem, ut imperdiet mauris. Quisque aliquam semper tellus ut ullamcorper. Aliquam sed egestas neque, non blandit nulla. Sed ut malesuada urna. Suspendisse tortor ligula, sollicitudin in vulputate ut, fermentum id orci. Etiam tempus nisl mauris, elementum tincidunt odio gravida ac. Donec fermentum magna gravida finibus laoreet. Fusce tempor felis sit amet metus aliquam aliquet.

Nam tempus gravida erat. Cras laoreet sem sed ex varius, in scelerisque mi consectetur. Nulla ullamcorper ornare erat non efficitur. Aenean posuere ex at sodales molestie. Praesent molestie dui elit, sed suscipit mi varius vehicula. Donec eget porttitor erat. Vestibulum imperdiet mauris quis dui imperdiet, a molestie velit rutrum. Aenean congue cursus urna sit amet fermentum. Nulla fringilla orci nibh, sed placerat felis auctor a. Nunc at ex nec arcu dapibus consequat. Suspendisse potenti. Sed lobortis eros ut felis placerat sodales.

</h1>
    </>
  );
}

export default App;