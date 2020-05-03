import React, { Component } from 'react'
import { Segment, Header, Button } from 'semantic-ui-react'
import { fetchProduct } from '../../actions'
// import AssetList from '../assets/AssetList'
import { connect } from 'react-redux'

class ProductDetail extends Component {
                
    componentDidMount() {
        const { id } = this.props.match.params
        if (id) {
            this.props.fetchProduct(id)
        }
    }

    render() {
        const { products } = this.props.product
        return (
            <div>
                <Segment clearing>
                    <Header as='h2' content={this.props.product.title} subheader={this.props.product.price} floated="left" />
                    <Header floated="right">
                        <Button as="a" href={`/products/${this.props.match.params.id}/products/new/form`} primary content="Add Product" icon="add" />
                    </Header>
                </Segment>
                
                {/* <AssetList assets={assets} />      */}
            </div>
        )
    }
}

function mapStateToProps({ products }) {
    return { product: products.product }
}

export default connect(mapStateToProps, { fetchProduct })(ProductDetail)