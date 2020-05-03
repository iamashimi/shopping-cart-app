import React from 'react'
import ProductList from './ProductList'
import { Button, Segment, Header } from 'semantic-ui-react'

const ProductDashboard = () => {
	return (
		<div>
			<Segment clearing>
				<Header as='h2' content="List of Products" floated="left" />
				<Header floated="right">
					<Button as="a" href="/products/new/form" primary content="Add Product" icon="add" />
				</Header>
			</Segment>
		
			<ProductList />
		</div>
	)
}

export default ProductDashboard