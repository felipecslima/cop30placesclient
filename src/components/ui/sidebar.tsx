// src/components/ui/sidebar.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PButton,
  PModal,
  PText,
  PDivider,
  PSelectWrapper,
} from '@porsche-design-system/components-react/ssr';

export function SidebarUi() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const cities = ['Belém', 'Ananindeua'];
  const categoriesByCity: Record<string, string[]> = {
    'Belém': ['Cultura', 'Gastronomia'],
    'Ananindeua': ['Comercial', 'Lazer'],
  };

  const categories = selectedCity ? categoriesByCity[selectedCity] || [] : [];

  return (
    <>
      <PButton
        icon="menu-lines"
        hideLabel
        type="button"
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 right-4 z-[999]"
      >
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
            categories={categories}
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
          categories={categories}
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
                          categories,
                        }: {
  cities: string[];
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  categories: string[];
}) {
  return (
    <div className="space-y-6">
      <div>
        <PText weight="semibold">Cidades</PText>
        <PSelectWrapper dropdownDirection="down" native={false}>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione uma cidade</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </PSelectWrapper>
      </div>

      <PDivider />

      <div>
        <PText weight="semibold">Categorias</PText>
        <PSelectWrapper dropdownDirection="down" native={false}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </PSelectWrapper>
      </div>
    </div>
  );
}
