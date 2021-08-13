import './GameList.scss';

import { GameCard, SearchInput, Slider } from '../../components';
import React, { useEffect, useRef, useState } from 'react';

import { Headline2 } from '../../core/Typography';
import { Link } from 'react-router-dom';
import PATH from '../../constants/path';
import PageLayout from '../../core/Layout/PageLayout';
import axios from 'axios';
import getKorRegExp from '../../components/SearchInput/service/getKorRegExp';

const GameList = () => {
  // const [sliderImageList, setSliderImageList] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const searchRef = useRef(null);

  const dummyImage = [
    {
      id: 0,
      info: 'Teamfight Tactics',
      src: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c2d19d4a-860f-4736-aaee-9671677c1bee/ddd8djc-68b444e6-738d-4428-822c-aac14e42c134.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MyZDE5ZDRhLTg2MGYtNDczNi1hYWVlLTk2NzE2NzdjMWJlZVwvZGRkOGRqYy02OGI0NDRlNi03MzhkLTQ0MjgtODIyYy1hYWMxNGU0MmMxMzQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.o-JsRdvyVURnwfQIS1C0b20UgfotvKZ3I6HR56_gDOY',
    },
    {
      id: 1,
      info: 'Unrailed',
      src: 'https://static3.srcdn.com/wordpress/wp-content/uploads/2020/09/Unrailed-Review-Logo.jpg',
    },
    {
      id: 2,
      info: 'Escape From Tarkov',
      src: 'https://www.mrpcgamer.com/wp-content/uploads/2020/11/EFT-1.jpg',
    },
    {
      id: 3,
      info: 'Pokemon Unite',
      src: 'https://www.videogamer.com/wp-content/uploads/Pokemon_UNITE_-_Gameplay_Trailer_-_Hero_Image.jpg',
    },
  ];

  const selectGame = (gameName) => {
    const game = gameList.find(({ name }) => name === gameName);
    setSelectedGames([game]);
  };

  // const getSliderImages = async () => {
  //   const response = await axios.get('');
  //   const images = response.data;

  //   setSliderImageList(images);
  // };

  const getGames = async () => {
    const response = await axios.get('https://test-api.babble.gg/api/games');
    const games = response.data;

    setGameList(games);
    setSelectedGames(games);
  };

  const onChangeGameInput = (e) => {
    const inputValue = e.target.value.replace(
      /[^0-9|ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z]+/g,
      ''
    );

    const searchResults = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g.test(inputValue)
      ? gameList.filter((game) => {
          const keywordRegExp = getKorRegExp(inputValue, {
            initialSearch: true,
            ignoreSpace: true,
          });
          return game.name.match(keywordRegExp);
        })
      : gameList.filter((game) => {
          const searchRegex = new RegExp(inputValue, 'gi');
          const keywordWithoutSpace = game.name.replace(/\s/g, '');
          return (
            keywordWithoutSpace.match(searchRegex) ||
            game.name.match(searchRegex)
          );
        });

    setSelectedGames(searchResults);
  };

  useEffect(() => {
    const stickyObserver = new IntersectionObserver(
      ([entry]) => {
        entry.target.classList.toggle(
          'stuck',
          entry.intersectionRatio < 1 && !entry.isIntersecting
        );
      },
      { threshold: 1 }
    );
    stickyObserver.observe(searchRef.current);

    // getSliderImages();
    getGames();

    return () => {
      stickyObserver && stickyObserver.disconnect();
    };
  }, []);

  return (
    <div className='game-list-container'>
      <Slider imageList={dummyImage} />
      <PageLayout>
        <Headline2>전체 게임</Headline2>
        <div className='search-container' ref={searchRef}>
          <section className='search-section'>
            <SearchInput
              placeholder='게임을 검색해주세요.'
              autoCompleteKeywords={selectedGames.map(({ name }) => ({
                name,
              }))}
              onClickKeyword={selectGame}
              onChangeInput={onChangeGameInput}
              isResetable={false}
            />
          </section>
        </div>
        <div className='game-list'>
          {selectedGames.map(({ id, name, headCount, thumbnail }) => (
            <Link to={`${PATH.ROOM_LIST}/${id}`} key={id}>
              <GameCard
                gameName={name}
                imageSrc={thumbnail}
                participants={headCount}
              />
            </Link>
          ))}
        </div>
      </PageLayout>
    </div>
  );
};

export default GameList;
