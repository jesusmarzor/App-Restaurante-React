import Head from "next/head";
import { useRouter } from "next/router";
import getObjects from "services/getObjects"
import { FoodList } from "components/FoodList";
import {ButtonBack} from "components/ButtonBack";
import { Button } from "components/Button";
import { useState, useEffect } from "react";
import { FormElement } from "components/FormElement";
import { allAllergens, allSort } from "assets/constants";
import { AuthConsumer } from "contexts/AuthContext";

export default function Menu({menu}) {
  const router = useRouter();
  const {user: authUser} = AuthConsumer();
  const [starters, setStarters] = useState(menu.filter( ({type}) => type === 'entrante'));
  const [mainCourses, setMainCourses] = useState(menu.filter( ({type}) => type === 'plato principal'));
  const [desserts, setDesserts] = useState(menu.filter( ({type}) => type === 'postre'));
  const [search, setSearch] = useState('todos');
  const [sort, setSort] = useState('más valorados');

  const allWithoutAllergens = ['todos'].concat(allAllergens.map( name => `sin ${name}`))
  const resetMenu = () => {
    setStarters(menu.filter( ({type, allergens}) => (type === 'entrante') && !JSON.parse(allergens).includes(search.substring(4))));
    setMainCourses(menu.filter( ({type, allergens}) => (type === 'plato principal') && !JSON.parse(allergens).includes(search.substring(4))));
    setDesserts(menu.filter( ({type, allergens}) => (type === 'postre') && !JSON.parse(allergens).includes(search.substring(4))));
  }
  const sortMenu = () => {
    if(sort === 'más valorados'){
      menu = menu.sort(
        (menu1, menu2) => {
          if(menu1.score < menu2.score){
            return 1;
          }
          if(menu1.score > menu2.score){
            return -1;
          }
          return 0;
        }
      );
    }else if(sort === 'menos valorados'){
      menu = menu.sort(
        (menu1, menu2) => {
          if(menu1.score > menu2.score){
            return 1;
          }
          if(menu1.score < menu2.score){
            return -1;
          }
          return 0;
        }
      );
    }
  }
  useEffect( () => {
    resetMenu();  
  },[search])

  useEffect( () => {
    sortMenu();
    resetMenu();
  },[sort])

  const changeSearch = (e) => {
    setSearch(e.target.value);
  }

  const changeSort = (e) => {
    setSort(e.target.value);
  }
  return (
      <>
      <Head>
          <title>Puro gourmet | Carta</title>
      </Head>
      <ButtonBack/>
      <h1 className="font-cookie text-center font-bold text-5xl">Carta</h1>
      <FormElement handleChange={changeSearch} type="select" options={allWithoutAllergens} label="Alérgenos"/>
      <FormElement handleChange={changeSort} type="select" options={allSort} label="Ordenar"/>
      <div className="flex flex-col">
        <FoodList title="Entrantes" menu={starters}/>
        <FoodList title="Platos principales" menu={mainCourses}/>
        <FoodList title="Postres" menu={desserts}/>          
      </div>
      {
        (authUser && authUser.role === "admin")
        &&
        <div className="flex flex-col justify-center items-center mt-5">
          <Button href="menu/create" backgroundColor="bg-green-600">Crear Plato</Button>
        </div>
      }
    </>
  )
}

export async function getServerSideProps () {
  const menu = await getObjects('menu');
  return {
    props: {
      menu
    }
  }
}
