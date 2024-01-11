import styled from "styled-components"


const ProductT = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 250px;
    height: 250px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
    transition: all 0.2s ease-in-out;
    &:hover {
        transform: scale(1.1);
        box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
    }
`;


export default function Product(item: any) {

    return (
        <>
            <ProductT>
                <h1>{item?.item?.title}</h1>
                <h1>{item?.item?.price}</h1>
                <h1>{item?.item?.description}</h1>
                <div>
                    {
                        item?.item?.images?.map((image: any) => (
                            <img className="w-[50px] h-[50px]" src={image} alt="image" />
                        ))
                    }
                </div>

            </ProductT>
        </>
    )
}