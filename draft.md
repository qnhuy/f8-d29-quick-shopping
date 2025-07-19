
                            ${(function() {
                                let starIcons = ''
                                for (let i = 0; i < Math.round(product.review.rating); i++) {
                                    starIcons += '<i class="star-icon fa-solid fa-star"></i>'
                                }
                                return starIcons
                            })()}