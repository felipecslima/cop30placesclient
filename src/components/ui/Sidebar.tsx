// src/components/ui/Sidebar.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PButton,
  PModal,
  PText,
  PDivider,
  PTextField,
  PTextFieldWrapper,
} from '@porsche-design-system/components-react/ssr';

export function Sidebar() {
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
        <PTextFieldWrapper>
          <PTextField
            type="text"
            value={selectedCity}
            onInput={(e) => setSelectedCity((e.target as HTMLInputElement).value)}
            placeholder="Digite uma cidade"
            icon="location-city"
          />
        </PTextFieldWrapper>
      </div>

      <PDivider />

      <div>
        <PText weight="semibold">Categorias</PText>
        <PTextFieldWrapper>
          <PTextField
            type="text"
            value={selectedCategory}
            onInput={(e) => setSelectedCategory((e.target as HTMLInputElement).value)}
            placeholder="Digite uma categoria"
            icon="tag"
          />
        </PTextFieldWrapper>
      </div>
    </div>
  );
}
