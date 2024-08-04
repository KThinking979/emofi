import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Text, HStack, Center } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import Matter from 'app/script/matter';
// import Matter from 'matter-js';

export function HomePage() {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let Engine = Matter.Engine;
    let Render = Matter.Render;
    let World = Matter.World;
    let Bodies = Matter.Bodies;

    let engine = Engine.create({});

    let render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width: 300,
        height: 300,
        background: 'rgba(0, 0, 0, 0)',
        wireframes: false,
      },
    });

    const floor = Bodies.rectangle(150, 300, 300, 20, {
      isStatic: true,
      render: {
        fillStyle: 'blue',
      },
    });

    const ball = Bodies.circle(150, 0, 10, {
      restitution: 0.9,
      render: {
        fillStyle: 'yellow',
      },
    });

    World.add(engine.world, [floor, ball]);

    Engine.run(engine);
    Render.run(render);
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        width: 300,
        height: 300,
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );

  // return (
  //   <Box>
  //     <Helmet>
  //       <title>Play</title>
  //       <meta name="description" content="EmoFi" />
  //     </Helmet>
  //     <Center w="full" h="full" alignItems={'center'} justifyContent="center">
  //       <HStack align={'center'} justify={'space-between'}>
  //         <Text
  //           fontSize={'14px'}
  //           fontWeight="bold"
  //           lineHeight={'20px'}
  //           textTransform="uppercase"
  //           textAlign={'center'}
  //           color={'white'}
  //         >
  //           Play
  //         </Text>
  //       </HStack>
  //     </Center>
  //   </Box>
  // );
}
