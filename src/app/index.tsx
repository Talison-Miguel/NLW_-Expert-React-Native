import { CategoryButton } from '@/components/categoryButton'
import { Header } from '@/components/header'
import { Product } from '@/components/product'
import { useCartStore } from '@/stores/cartStore'
import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'
import { Link } from 'expo-router'
import { useRef, useState } from 'react'
import { View, SectionList, FlatList, Text } from 'react-native'

export default function Home() {
    const cartStore = useCartStore()
    const [category, setCategory] = useState(CATEGORIES[0])

    const sectionsListRef = useRef<SectionList<ProductProps>>(null)

    const cartQuantityItems = cartStore.products.reduce((aculmulator, currentValue) => aculmulator + currentValue.quantity, 0 )

    function handleCategorySelect(selectedCategory: string) {
        setCategory(selectedCategory)

        const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory)

        if(sectionsListRef.current) {
            sectionsListRef.current.scrollToLocation({
                animated: true,
                sectionIndex,
                itemIndex: 0
            })
        }

    }

    return (
        <View className="flex-1 pt-8">
            <Header title="Faça seu pedido" cardQuantityItems={cartQuantityItems}/>

            <FlatList
                data={CATEGORIES}
                keyExtractor={(item) => item}
                renderItem={({ item }) => <CategoryButton title={item} isSelected={item === category} onPress={() => handleCategorySelect(item)}/>}
                horizontal
                className='max-h-10 my-5'
                contentContainerStyle={{gap: 12, paddingHorizontal: 20}}
                showsHorizontalScrollIndicator={false}
            />

            <SectionList
                ref={sectionsListRef}
                sections={MENU}
                keyExtractor={(item) => item.id}
                stickySectionHeadersEnabled={false}
                renderItem={({item}) => (
                    <Link href={`/product/${item.id }`} asChild>
                        <Product data={item}/>
                    </Link>
                )}
                renderSectionHeader={({section: {title}}) => (
                    <Text className='text-xl text-white font-heading mt-8 mb-3'>
                        {title}
                    </Text>
                )}   
                className='flex-1 p-5'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </View>
    )
}   