// src/components/Sidebar.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PButton,
  PModal,
  PText,
  PDivider
} from '@porsche-design-system/components-react/ssr';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const cities = ['Belém', 'Ananindeua'];
  const categoriesByCity: Record<string, string[]> = {
    'Belém': ['Cultura', 'Gastronomia'],
    'Ananindeua': ['Comercial', 'Lazer'],
  };

  return (
    <>
      <PButton icon="menu-lines" hideLabel type="button" onClick={() => setIsOpen(true)} className="md:hidden fixed top-4 right-4 z-[999]">
        Abrir menu
      </PButton>

      <PModal open={isOpen} onDismiss={() => setIsOpen(false)}>
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="p-4"
        >
          <h2 className="text-xl font-bold mb-4">Filtros</h2>

          <SidebarContent
            cities={cities}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categoriesByCity={categoriesByCity}
          />
        </motion.div>
      </PModal>

      <div className="hidden md:block h-screen w-72 border-r bg-white p-4">
        <SidebarContent
          cities={cities}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categoriesByCity={categoriesByCity}
        />
      </div>
    </>
  );
}

function SidebarContent({
                          cities,
                          selectedCity,
                          setSelectedCity,
                          selectedCategory,
                          setSelectedCategory,
                          categoriesByCity,
                        }: {
  cities: string[];
  selectedCity: string | null;
  setSelectedCity: (value: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (value: string) => void;
  categoriesByCity: Record<string, string[]>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <PText weight="semibold">Cidades</PText>
        <div className="space-y-2 mt-2">
          {cities.map((city) => (
            <PButton
              key={city}
              type="button"
              variant={selectedCity === city ? 'primary' : 'secondary'}
              onClick={() => setSelectedCity(city)}
              icon={selectedCity === city ? 'check' : 'none'}
            >
              {city}
            </PButton>
          ))}
        </div>
      </div>

      <PDivider />

      <div>
        <PText weight="semibold">Categorias</PText>
        <div className="space-y-2 mt-2">
          {(selectedCity ? categoriesByCity[selectedCity] || [] : []).map((category) => (
            <PButton
              key={category}
              type="button"
              variant={selectedCategory === category ? 'primary' : 'secondary'}
              onClick={() => setSelectedCategory(category)}
              icon={selectedCategory === category ? 'check' : 'none'}
            >
              {category}
            </PButton>
          ))}
        </div>
      </div>
    </div>
  );
}
