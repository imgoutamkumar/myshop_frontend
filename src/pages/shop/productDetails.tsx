/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetProductByIdQuery } from '@/redux/services/productApi';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { skipToken } from "@reduxjs/toolkit/query"
import { useMemo, useState } from 'react';
import RenderAttributes from '@/components/shop/RenderAttributes';
import allProducts from '@/mockdata/allProducts.json';
const ProductDetails = () => {


  const navigate = useNavigate()
  const [queryParams] = useSearchParams()
  const { productId } = useParams<{ productId: string }>()
  const variantId = queryParams.get("v")
  const { data, isLoading, isFetching } = useGetProductByIdQuery(productId ?? skipToken)
  console.log("data", data)
  const product = data?.data

  // mock data start
  
  // const mockProduct = allProducts.find(
  //   (item) => item.id === productId
  // );
  // const product = mockProduct

  // mock data end


  // const images = product?.variants[0].images || []
  // const [variantImages, setVariantImages] = useState(product?.variants[0]?.images || [])
  // const [activeImg, setActiveImg] = useState<string>("")
  const selectedVariant = useMemo(() => {
    if (!productId || !variantId) return null

    return product?.variants?.find(v => v?.id === variantId)
  }, [product, variantId])

  const variantImages = selectedVariant?.images ?? []
  const defaultImg = variantImages.at(0)?.url
  const [activeImg, setActiveImg] = useState<string | null>(null)
  const displayedImg = activeImg ?? defaultImg ?? ""



  if (isLoading || isFetching) return <p>Loading...</p>
  return (
    <div className='flex flex-col gap-6 animate-fade-in w-full'>
      <div className='grid grid-cols-1 lg:grid-cols-2 p-1'>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-3">

          {/* THUMBNAILS - LEFT on PC, BOTTOM on mobile */}
          <div
            className="
      flex gap-3 p-2
      order-2 sm:order-1
      overflow-x-auto sm:overflow-y-auto
      sm:flex-col
      sm:h-[600px]
        w-full sm:w-[140px] md:w-[170px] lg:w-[120px]
      premium-scrollbar
    "
          >
            {variantImages.map((img: any) => (
              <div
                key={img?.id}
                onClick={() => setActiveImg(img?.url)}
                className={`w-[80px] sm:w-[90px] md:w-full
h-[80px] sm:h-[90px]
cursor-pointer rounded-xl overflow-hidden
transition-all duration-300 ease-out
hover:scale-[1.03] hover:shadow-lg
${activeImg === img?.url
                    ? "ring-2 ring-pink-400 ring-offset-2 scale-105 shadow-md"
                    : "border border-gray-200 hover:border-pink-300"
                  }`}
              >
                <img
                  src={img?.url}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* MAIN IMAGE - RIGHT on PC */}
          <div className="bg-gradient-to-br lg:w-[500px] from-pink-50 to-purple-50 rounded-2xl overflow-hidden sm:h-[600px] shadow-sm w-full sm:w-[75%] order-1 sm:order-2">
            {displayedImg && (
              <img
                src={displayedImg}
                alt="product"
                className="w-full  h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            )}
          </div>

        </div>
        <div className="px-3">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-800">{product?.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {Array(5).fill('').map((_, i) => (
              product?.rating > i ? (
                <svg className="transition-all duration-300" key={i} width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" fill="#615fff" />
                </svg>
              ) : (
                <svg className="transition-all duration-300" key={i} width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z" fill="#615fff" fillOpacity="0.35" />
                </svg>
              )
            ))}
            <p className="text-base ml-2">({product?.rating})</p>
          </div>

          <div className="mt-6 bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-gray-100">
            <p className="text-gray-400 line-through text-sm">MRP: ${product?.price}</p>
            <p className="text-2xl font-semibold text-pink-600">MRP: ${product?.offerPrice}</p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>
          {/* <ul className="list-disc ml-4 text-gray-500/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul> */}

          <div className="flex items-center mt-10 gap-4 text-base">
            <button className="w-full py-3.5 font-medium rounded-xl
bg-white border border-gray-200
hover:bg-pink-50 hover:border-pink-200
transition-all duration-300 hover:scale-[1.02] cursor-pointer" >
              Add to Cart
            </button>
            <button className="w-full py-3.5 font-medium rounded-xl
bg-gradient-to-r from-pink-400 to-purple-400
text-white shadow-md
hover:shadow-lg hover:scale-[1.02]
transition-all duration-300 cursor-pointer" >
              Buy now
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 space-y-4">
        for other info
        <div className="flex flex-wrap gap-3 w-full">
          {product?.variants.map((variant: any, index: number) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/shop/product/${productId}?v=${variant?.id}`, { replace: true })
                setActiveImg(variant.images?.[0]?.url)
              }}
              className="cursor-pointer px-3 py-2 rounded-full
  bg-gray-100 hover:bg-pink-50
  text-sm transition-all duration-300
  hover:scale-[1.03]"
            >
              <span>{variant?.sku}</span>
            </div>
          ))}
          <div>
            <RenderAttributes product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}


export default ProductDetails
