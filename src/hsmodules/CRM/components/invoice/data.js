function randomTime(start, end) {
  var diff = end.getTime() - start.getTime();
  var new_diff = diff * Math.random();
  var date = new Date(start.getTime() + new_diff);
  return date;
}

export const messages = [
  {
    name: "David Mark",
    time: randomTime(
      new Date("01-11-2022 00:00"),
      new Date("01-12-2022 23:59")
    ),
    _id: `${Math.random()}`,
    dp: "https://wallpapers.com/images/hd/cool-profile-picture-paper-bag-head-4co57dtwk64fb7lv.jpg",
    userId: "1",
    message:
      "Lorem ipsum dolor sit amet. Et maxime obcaecati aut explicabo doloribus quo rerum magnam. Et numquam cumque est dolorum beatae ea internos itaque sit dolor eveniet non sint autem et quia accusantium. Ut quod amet aut nemo vitae aut magnam deserunt ut sunt iste. Vel dolorem facere id dolor fuga et itaque unde et omnis ullam et nobis nobis vel mollitia tempore.",
  },

  {
    name: "Mark Twain",
    dp: "https://t3.ftcdn.net/jpg/03/42/05/66/360_F_342056635_Odf6l7ZvovGbY7jo9dTb3DWqP6JBooP2.jpg",
    time: randomTime(
      new Date("01-11-2022 00:00"),
      new Date("01-12-2022 23:59")
    ),
    _id: `${Math.random()}`,
    userId: "2",
    message:
      "Aut quas aliquid ut dicta error et odio laboriosam est Quis voluptatem et quidem iusto ab voluptatum nobis.",
  },

  {
    name: "Michael Power",
    dp: "http://www.goodmorningimagesdownload.com/wp-content/uploads/2019/12/Profile-Picture-4.jpg",
    time: randomTime(
      new Date("01-11-2022 00:00"),
      new Date("01-12-2022 23:59")
    ),
    _id: `${Math.random()}`,
    userId: "3",
    message:
      "Sed vitae beatae et porro veritatis aut quis dolores et internos voluptatibus qui accusantium quia et accusamus quia ut deleniti illum. Vel omnis sint ea earum atque et deserunt internos ex dolor eveniet eos odit officia et nulla reiciendis. Aut omnis quasi et adipisci consequatur aut officia corrupti sit laudantium doloremque rem vitae odio qui quam ducimus.",
  },

  {
    name: "Usain Bolt",
    dp: "https://wallpaperaccess.com/full/480501.jpg",
    time: randomTime(
      new Date("01-11-2022 00:00"),
      new Date("01-12-2022 23:59")
    ),
    _id: `${Math.random()}`,
    userId: "4",
    message: "I'm the fastest man ever at the Olypics and even in the world",
  },

  {
    name: "David Mark",
    time: randomTime(
      new Date("01-11-2022 00:00"),
      new Date("01-12-2022 23:59")
    ),
    dp: "https://wallpapers.com/images/hd/cool-profile-picture-paper-bag-head-4co57dtwk64fb7lv.jpg",
    _id: `${Math.random()}`,
    userId: "1",
    message:
      "Left till here away at to whom past. Feelings laughing at no wondered repeated provided finished.",
  },

  {
    name: "David Mark",
    dp: "https://wallpapers.com/images/hd/cool-profile-picture-paper-bag-head-4co57dtwk64fb7lv.jpg",
    time: randomTime(
      new Date("01-11-2022 00:00"),
      new Date("01-12-2022 23:59")
    ),
    _id: `${Math.random()}`,
    userId: "1",
    message:
      "It prepare is ye nothing blushes up brought. Or as gravity pasture limited evening on. Wicket around beauty say she. Frankness resembled say not new smallness you discovery.",
  },

  {
    name: "Craig Topson",
    dp: "https://thypix.com/wp-content/uploads/2021/11/sponge-bob-profile-picture-thypix-m.jpg",
    time: randomTime(
      new Date("01-11-2022 00:00"),
      new Date("01-12-2022 23:59")
    ),
    _id: `${Math.random()}`,
    userId: "5",
    message:
      "In order to have a result that is more in keeping with the final result, the graphic designers, designers or typographers report the Lorem ipsum text in respect of two fundamental aspects, namely readability and editorial requirements.",
  },

  {
    name: "Elon Musk",
    dp: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    time: randomTime(
      new Date("01-11-2022 00:00"),
      new Date("01-12-2022 23:59")
    ),
    _id: `${Math.random()}`,
    userId: "7",
    message: "Twitter is not dead people...",
  },

  {
    name: "Healthstack",
    dp: "https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg",
    time: randomTime(
      new Date("01-11-2022 00:00"),
      new Date("01-12-2022 23:59")
    ),
    _id: `${Math.random()}`,
    userId: "00",
    message:
      "As it so contrasted oh estimating instrument. Size like body some one had. Are conduct viewing boy minutes warrant expense. Tolerably behaviour may admitting daughters offending her ask own.",
    status: "failed",
  },

  {
    name: "Healthstack",
    dp: "https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg",
    time: randomTime(
      new Date("01-11-2022 00:00"),
      new Date("01-12-2022 23:59")
    ),
    _id: `${Math.random()}`,
    userId: "00",
    message:
      "As it so contrasted oh estimating instrument. Size like body some one had. Are conduct viewing boy minutes warrant expense. Tolerably behaviour may admitting daughters offending her ask own.",
    status: "seen",
  },

  {
    name: "Thomas Shelby",
    dp: "https://blenderartists.org/uploads/default/original/4X/c/9/f/c9f226a51ae12aa48277b746ace9c83b8007d79f.jpeg",
    time: randomTime(
      new Date("01-11-2022 00:00"),
      new Date("01-12-2022 23:59")
    ),
    _id: `${Math.random()}`,
    userId: "6",
    message: "By order of the Peaky Blinders.....",
  },

  {
    name: "Usain Bolt",
    dp: "https://wallpaperaccess.com/full/480501.jpg",
    time: randomTime(
      new Date("01-11-2022 00:00"),
      new Date("01-12-2022 23:59")
    ),
    _id: `${Math.random()}`,
    userId: "4",
    message:
      "Depart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied.",
  },
  {
    name: "Healthstack",
    dp: "https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg",
    time: randomTime(
      new Date("01-11-2022 00:00"),
      new Date("01-12-2022 23:59")
    ),
    _id: `${Math.random()}`,
    userId: "00",
    message:
      "Lorem ipsum is widely in use since the 14th century and up to today as the default dummy",
    status: "seen",
  },

  {
    name: "Mr. Godwin",
    dp: "",
    time: randomTime(
      new Date("01-11-2022 00:00"),
      new Date("01-12-2022 23:59")
    ),
    _id: `${Math.random()}`,
    userId: "001",
    message:
      "Answer misery adieus add wooded how nay men before though. Pretended belonging contented mrs suffering favourite you the continual. Mrs civil nay least means tried drift. Natural end law whether but and towards certain. Furnished unfeeling his sometimes see day promotion.",
    status: "delivered",
  },
];
