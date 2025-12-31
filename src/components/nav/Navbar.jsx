import React, { useRef } from 'react'
import { NavItem } from './NavItem'
import { Menu } from 'primereact/menu';
import logoOkaya from '../../assets/logo_okaya.png'

export const Navbar = () => {

  const items = [

    {
       template: () => {
                return (
                  <div className='p-3 flex items-center'>
                    <img src={logoOkaya} style={{width: "50%"}}></img>
                    <span className="font-medium text-xl font-semibold">
                    <span className="text-primary">OKAYA</span>
                    </span>
                 
                  </div>
                  
                      
                );
            }
    },
    
    {
    label: 'Schedule',
    items: [
      {
        label: "Ver agenda",
        icon: "pi pi-calendar",
        url: "/schedule"
      },
      {
        label: 'Agregar actividad',
        icon: "pi pi-calendar-plus"
      },
      {
        label: "Editar actividad",
        icon: "pi pi-calendar-minus"
      },
      {
        label: "Eliminar actividad",
        icon: "pi pi-calendar-times"
      }
    ]
  },

  {
    label: 'Proyectos',
    items: [
      {
        label: "Ver proyectos",
        icon: "pi pi-folder",
        url: "/proyectos"
      },

      {
        label: 'Nuevo proyecto',
        icon: "pi pi-folder-plus"
      }
    ]
  },

  
  {
    label: 'Raidd',
    items: [
      {
        label: "Ver raidd",
        icon: "pi pi-eye",
        url: "/raidd"
      },


    ]
  },
  {
    label: 'Contratos',
    items: [
         {
        label: "Ver contratos",
        icon: "pi pi-file",
        url: "/contratos"
      },
      {
        label: "Nuevo contrato",
        icon: "pi pi-file-import"
      }
    ]
  },
]
  return (
    <>
      <div className='w-48 h-screen'>
        <Menu model={items} pt={
          {
            root: {style: { borderRadius: "8px"}},
            
          }
        } />
      </div>
        
    </>
  )
}
