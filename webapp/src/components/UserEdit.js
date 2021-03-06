// Render Prop


import React  from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

 export default function UserEdit (props) { 
   const  navigate =useNavigate("")
  var  userStorage =  localStorage.getItem("user").split(",");
  // confirmation
  var choix ;
  
  
   return(

    <div className=' border  flex flex-col justify-content-center items-center w-200'>
    
  
        <div className='flex flex-col w-500' > 
        <Link to={props.to} className='hover:bg-blue hover:text-blue underline cursor:pointer' > Retour</Link>  
        
        <div className="h-screen md:flex">
          <div
            className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
            <div>
              <h1 className="text-white font-bold text-4xl font-sans px-2">Information utilisateur</h1>
              
              <Link to={props.to}><button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Retour</button></Link>

              <table className ="text-white font-bold text-1xl font-sans px-2 flex flex-col justify-center">
                <tr>
                   <td>Nom : </td>
                   <th className="bg:black underline">{userStorage[0]}</th>
                </tr>
                <tr>
                   <td>prénoms : </td>
                   <th>{userStorage[1]}</th>
                </tr>
                <tr>
                   <td>email : </td>
                   <th>{userStorage[2]}</th>
                </tr>
             </table>
            </div>

            
          </div>
          <div className="flex md:w-1/2 px-10 justify-center py-10 items-center bg-white">
          <Formik
          initialValues={{ firstname: '', lastname: '', email: '' }}
          validationSchema={Yup.object({
            firstname: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            lastname: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              // choix 
              choix = window.confirm("Etes vous sur du choix de vos élements");
              if( choix == true){
                axios({
                  url:"http://localhost:8080/api/user/update-user/:"+userStorage[3].toString(),
                  method:"POST",
                  headers : {
                    "Content-Type" :"application/json",
                  },
                  data : JSON.stringify(values, null, 2)
                }).then((res)=>{
                  alert(JSON.stringify(values, null, 2));
                  alert("Utilisateu créer avec  Succées");
                  navigate("/");
                }).catch(()=>{
                  alert("Error de mis a jour !!! ");
                });
              }else{
                return;
              }
             
              
            }, 400);
          }}
        >
        {formik => (
            <form className="bg-white" onSubmit={formik.handleSubmit}>
              <h1 className="text-gray-800 font-bold text-2xl mb-1">Mettre a jour</h1>
              <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd" />
                </svg>
                <input className="pl-2 outline-none border-none" type="text"  name="firstname" id="firstname" placeholder="Full name" {...formik.getFieldProps('firstname')} />
              </div>
              {formik.touched.firstname && formik.errors.firstname ? (
                <div >{formik.errors.firstname}</div>
              ) : null}

                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                  <input className="pl-2 outline-none border-none" type="text" name="lastname" id="lastname" placeholder="Username" {...formik.getFieldProps('lastname')} />
              </div>
              {formik.touched.lastname && formik.errors.lastname ? (
                <div>{formik.errors.lastname}</div>
              ) : null}



                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <input className="pl-2 outline-none border-none" type="email" name="email" id="email"  placeholder="Email Address" {...formik.getFieldProps('email')} />
                  </div>
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}

                      <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Update</button>
                      
            </form>
            )}
            </Formik>
          </div>
        </div>
        </div>

      
    
      
      
    
  </div>


   )


}
