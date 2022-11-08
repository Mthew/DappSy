

import MainHeader from '../components/Header'

const MainLayout = ({children}) =>{
    return(
        <div>
              

             <MainHeader />
            <main className=' d-flex justify-content align-items'>
               <div className='main-content'>

                {children}
               </div>
            </main>

           
             
        </div>
    )
}

export default MainLayout