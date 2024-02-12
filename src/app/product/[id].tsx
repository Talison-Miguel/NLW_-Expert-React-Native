import { Button } from "@/components/button";
import { FormatCurrency } from "@/utils/data/functions/formatCurrency";
import { PRODUCTS } from "@/utils/data/products";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { Image, Text, View } from "react-native";

import { Feather } from "@expo/vector-icons"
import { LinkButton } from "@/components/linkButton";
import { useCartStore } from "@/stores/cartStore";

export default function ProductId() {
    const cartStore = useCartStore()
    const { id } = useLocalSearchParams()
    const navigation = useNavigation()

    const product = PRODUCTS.find((item) => item.id === id)

    function handleAddToCart() {
        if(product) {
            cartStore.add(product)
            navigation.goBack()
        }
    }

    if(!product) return <Redirect href={'/'}/>

    return (
        <View className="flex-1">
            <Image className="w-full h-52" resizeMode="cover" source={product.cover}/>
        

            <View className="p-5 mt-8 flex-1">
                <Text className="text-white text-xl font-heading">{product.title}</Text>
                <Text className="text-lime-400 text-2xl font-heading my-2">
                    {FormatCurrency(product.price)}
                </Text>

                <Text className="text-slate-400 font-body text-base leading-6 mb-6">
                    {product.description}
                </Text>

                {
                    product.ingredients.map((item: string) => (
                        <Text key={item} className="text-slate-400 font-body text-base leading-6">
                             {"\u2022"} {item}
                        </Text>
                    ))
                }
            </View>

            <View className="p-5 pb-8 gap-5">
                <Button onPress={handleAddToCart}>
                    <Button.Icon>
                        <Feather name="plus-circle" size={20}/>
                    </Button.Icon>
                    <Button.Text > Adicionar ao pedido</Button.Text>
                </Button>

                <LinkButton title="Voltar ao cardápio" href="/" />
            </View>
        </View>
    )
}